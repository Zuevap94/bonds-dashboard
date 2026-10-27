#!/usr/bin/env python3
"""Сборка дашборда воронки «Облигации 2026»: Метрика + GetCourse + Бизон + расход → data/*.json → out/dashboard.html.

Запуск вручную:  python3 update_dashboard.py
Автозапуск:      launchd, каждый день в 09:00 (см. install_schedule.sh)
Ключи:           keys.env (только на этом компьютере, значения в лог не попадают)

Строка данных = день × воронка × источник × канал × кампания:
  visits, form_open, lead_goal — Яндекс Метрика (счётчики рекламы и органики)
  leads                        — GetCourse: добавлен в группу вебинара (реклама 5009549 / органика 5011602)
  attended, attended30         — Бизон: зрители эфиров bonds / bonds-10 / bonds-15 / bonds-17 (≥30 мин)
  orders, paid, revenue        — GetCourse: заказы трёх тарифов курса
  spend                        — spend.csv (вручную)
Привязка к источнику: UTM пользователя в GetCourse (их ставит Vakas при регистрации); визиты — UTM визита в Метрике.
"""
import base64, csv, datetime as dt, json, os, pathlib, re, sys, time, traceback, urllib.error, urllib.parse, urllib.request
from collections import defaultdict

ROOT = pathlib.Path(__file__).resolve().parent
DATA = ROOT / 'data'; OUT = ROOT / 'out'; LOGS = ROOT / 'logs'
for d in (DATA, OUT, LOGS): d.mkdir(exist_ok=True)

START = dt.date(2026, 10, 20)          # запуск воронки — раньше данных нет
GROUPS = {5009549: 'Реклама', 5011602: 'Органика'}
COUNTERS = {'METRIKA_COUNTER_ADS': 'Реклама', 'METRIKA_COUNTER_ORGANIC': 'Органика'}
ROOMS = ('121345:bonds', '121345:bonds-10', '121345:bonds-15', '121345:bonds-17')
COURSE_MARK = 'Облигации: пошаговая сборка портфеля'
EXCLUDE_EMAILS = {e.strip().lower() for e in os.environ.get('EXCLUDE_EMAILS', '').split(',') if e.strip()}  # тестовые адреса, задаются в окружении
EXCLUDE_SOURCES = {'test'}
NA = '(не указан)'
REPO = 'Zuevap94/bonds-dashboard'   # GitHub-репозиторий сборки (кнопка «Обновить» запускает его workflow)

MSK = dt.timezone(dt.timedelta(hours=3))
log_lines = []


def log(*a):
    s = ' '.join(str(x) for x in a)
    log_lines.append(s); print(s)


def load_env():
    """Ключи: переменные окружения (GitHub Secrets) или локальный keys.env."""
    env = {}
    kf = ROOT / 'keys.env'
    if kf.exists():
        for line in kf.read_text(encoding='utf-8').splitlines():
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                k, v = line.split('=', 1); env[k.strip()] = v.strip()
    for k, v in os.environ.items():
        if v: env[k] = v
    global EXCLUDE_EMAILS
    EXCLUDE_EMAILS |= {e.strip().lower() for e in env.get('EXCLUDE_EMAILS', '').split(',') if e.strip()}
    env.setdefault('GETCOURSE_ACCOUNT', 'artemzuev'); env.setdefault('METRIKA_COUNTER_ADS', '113735882'); env.setdefault('METRIKA_COUNTER_ORGANIC', '113735885')
    missing = [k for k in ('GETCOURSE_ACCOUNT', 'GETCOURSE_KEY', 'BIZON_TOKEN', 'METRIKA_TOKEN', 'METRIKA_COUNTER_ADS', 'METRIKA_COUNTER_ORGANIC') if not env.get(k)]
    if missing:
        raise SystemExit('В keys.env не заполнены: ' + ', '.join(missing))
    return env


def http(url, headers=None, tries=3):
    last = None
    for i in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=headers or {}), timeout=120) as r:
                return r.read().decode('utf-8', 'replace')
        except urllib.error.HTTPError as e:
            last = 'HTTP %s %s' % (e.code, e.read().decode('utf-8', 'replace')[:200])
            if e.code in (401, 403): break
        except Exception as e:
            last = repr(e)
        time.sleep(3 * (i + 1))
    raise RuntimeError(last)


def norm(s):
    s = (s or '').strip().lower()
    return s if s else NA


# ---------------------------------------------------------------- Метрика
def metrika(env):
    """{(date, funnel, source, medium, campaign): {visits, form_open, lead_goal}}"""
    out = defaultdict(lambda: {'visits': 0, 'form_open': 0, 'lead_goal': 0})
    h = {'Authorization': 'OAuth ' + env['METRIKA_TOKEN']}
    for key, funnel in COUNTERS.items():
        cid = env[key]
        goals = json.loads(http('https://api-metrika.yandex.net/management/v1/counter/%s/goals' % cid, h))['goals']
        gid = {g['name']: g['id'] for g in goals}
        g_open, g_lead = gid.get('Открыл форму регистрации'), gid.get('Зарегистрировался')
        metrics = ['ym:s:visits'] + ['ym:s:goal%sreaches' % g for g in (g_open, g_lead) if g]
        offset, limit = 1, 1000
        while True:
            q = urllib.parse.urlencode({'ids': cid, 'metrics': ','.join(metrics),
                                        'dimensions': 'ym:s:date,ym:s:UTMSource,ym:s:UTMMedium,ym:s:UTMCampaign',
                                        'date1': START.isoformat(), 'date2': 'today', 'limit': limit, 'offset': offset, 'accuracy': 'full'})
            j = json.loads(http('https://api-metrika.yandex.net/stat/v1/data?' + q, h))
            for row in j.get('data', []):
                d = [x['name'] for x in row['dimensions']]
                src, med, camp = norm(d[1]), norm(d[2]), norm(d[3])
                if src in EXCLUDE_SOURCES: continue
                m = row['metrics']
                r = out[(d[0], funnel, src, med, camp)]
                r['visits'] += int(m[0])
                if g_open: r['form_open'] += int(m[1])
                if g_lead: r['lead_goal'] += int(m[-1])
            if len(j.get('data', [])) < limit: break
            offset += limit
        log('Метрика', funnel, 'строк:', sum(1 for k in out if k[1] == funnel))
    return out


# ---------------------------------------------------------------- GetCourse
def gc_export_start(env, path, params=None):
    """Запускает выгрузку GetCourse, возвращает export_id (готовится на их стороне 1–15 минут)."""
    acc, key = env['GETCOURSE_ACCOUNT'], env['GETCOURSE_KEY']
    q = dict(params or {}); q['key'] = key
    for attempt in range(7):  # лимит GetCourse на число запросов снимается через ~час
        j = json.loads(http('https://%s.getcourse.ru/pl/api/account/%s?%s' % (acc, path, urllib.parse.urlencode(q))))
        if j.get('success'):
            return j['info']['export_id']
        msg = j.get('error_message') or ''
        if 'много запросов' in msg and attempt < 6:
            log('GetCourse: лимит запросов, ждём 10 минут (%s)' % path); time.sleep(600); continue
        if 'Уже запущен' in msg and attempt < 6:
            log('GetCourse: предыдущая выгрузка ещё идёт, ждём 2 минуты (%s)' % path); time.sleep(120); continue
        raise RuntimeError('GetCourse %s: %s' % (path, j.get('error_message')))


def gc_export_wait(env, eid, label, minutes=25):
    acc, key = env['GETCOURSE_ACCOUNT'], env['GETCOURSE_KEY']
    t0 = time.time()
    while time.time() - t0 < minutes * 60:
        time.sleep(45)  # реже: опросы тоже считаются в лимит запросов GetCourse
        j = json.loads(http('https://%s.getcourse.ru/pl/api/account/exports/%s?key=%s' % (acc, eid, key)))
        if j.get('success') and j['info'].get('items') is not None:
            f = j['info']['fields']
            log('GetCourse выгрузка', label, 'готова за %.0f c' % (time.time() - t0))
            return [dict(zip(f, it)) for it in j['info']['items']]
        if j.get('error') and j.get('error_code') not in (909,):
            raise RuntimeError('GetCourse экспорт %s: %s' % (label, j.get('error_message')))
    raise RuntimeError('GetCourse: выгрузка %s не готова за %d мин' % (label, minutes))


def gc_export(env, path, label, params=None):
    """GetCourse выполняет только одну выгрузку за раз, поэтому строго по очереди: запустить → дождаться."""
    return gc_export_wait(env, gc_export_start(env, path, params), label)


def gc_members(env):
    """email → {funnel, date, source, medium, campaign}; первая регистрация побеждает."""
    members = {}
    for gid, funnel in GROUPS.items():
        rows = gc_export(env, 'groups/%s/users' % gid, 'группа ' + funnel)
        for r in rows:
            email = (r.get('Email') or '').strip().lower()
            added = (r.get('Добавлен в группу') or r.get('Создан') or '')[:10]
            if not email or email in EXCLUDE_EMAILS or not added or added < START.isoformat(): continue
            src = norm(r.get('gc_system_user_utm_source') or r.get('utm_source'))
            if src in EXCLUDE_SOURCES: continue
            rec = {'funnel': funnel, 'date': added, 'source': src,
                   'medium': norm(r.get('gc_system_user_utm_medium') or r.get('utm_medium')),
                   'campaign': norm(r.get('gc_system_user_utm_campaign') or r.get('utm_campaign')),
                   'messenger': norm(r.get('Мессенджер') or r.get('messenger'))}
            if email not in members or rec['date'] < members[email]['date']:
                members[email] = rec
        log('GetCourse группа', funnel, 'участников всего:', len(rows))
    return members


def gc_orders(env, members):
    """{(date, funnel, source, medium, campaign): {orders, paid, revenue}} и по людям: email → {paid, revenue}"""
    out = defaultdict(lambda: {'orders': 0, 'paid': 0, 'revenue': 0.0})
    per_email = defaultdict(lambda: {'orders': 0, 'paid': 0, 'revenue': 0.0})
    rows = gc_export(env, 'deals', 'заказы', {'created_at[from]': START.isoformat()})
    n = 0
    for r in rows:
        if COURSE_MARK not in (r.get('Состав заказа') or ''): continue
        email = (r.get('Email') or '').strip().lower()
        if email in EXCLUDE_EMAILS: continue
        status = r.get('Статус') or ''
        if status in ('Ложный', 'Отменен'): continue
        m = members.get(email)
        if m:
            funnel, src, med, camp, msg = m['funnel'], m['source'], m['medium'], m['campaign'], m.get('messenger', NA)
        else:
            msg = NA
            funnel = 'Органика' if 'organic' in (r.get('user_utm_campaign') or '') else 'Реклама'
            src, med, camp = norm(r.get('user_utm_source')), norm(r.get('user_utm_medium')), norm(r.get('user_utm_campaign'))
        created = (r.get('Дата создания') or '')[:10]
        paid_flag = (r.get('Оплачен') == 'Да') or status in ('Завершен', 'Частично оплачен')
        money = float((r.get('Оплачено') or '0').replace(',', '.') or 0)
        out[(created, funnel, src, med, camp, msg)]['orders'] += 1
        per_email[email]['orders'] += 1
        if paid_flag:
            pdate = (r.get('Дата оплаты') or created)[:10] or created
            out[(pdate, funnel, src, med, camp, msg)]['paid'] += 1
            out[(pdate, funnel, src, med, camp, msg)]['revenue'] += money
            per_email[email]['paid'] += 1
            per_email[email]['revenue'] += money
        n += 1
    log('GetCourse заказы курса:', n)
    return out, per_email


# ---------------------------------------------------------------- Бизон
def bizon(env, members):
    """{(date, funnel, source, medium, campaign): {attended, attended30}} — человек считается раз в день."""
    h = {'X-Token': env['BIZON_TOKEN']}
    reports = []
    skip = 0
    while True:
        j = json.loads(http('https://online.bizon365.ru/api/v1/webinars/reports/getlist?skip=%d&limit=100&minDate=%s' % (skip, START.isoformat()), h))
        lst = j.get('list', [])
        reports += [r for r in lst if r.get('name') in ROOMS or r.get('name', '').split('*')[0] in ROOMS]
        if len(lst) < 100: break
        skip += 100
    seen = {}  # (email, date) → minutes
    for rep in reports:
        wid = rep['webinarId']
        m = re.search(r'\*(\d{4}-\d{2}-\d{2})T', wid)
        wdate = m.group(1) if m else (rep.get('created') or '')[:10]
        skip, limit = 0, 500
        while True:
            j = json.loads(http('https://online.bizon365.ru/api/v1/webinars/reports/get?webinarId=%s&skip=%d&limit=%d' % (urllib.parse.quote(wid), skip, limit), h))
            rr = j.get('report') or {}
            inner = rr.get('report')
            if isinstance(inner, str):
                try: inner = json.loads(inner)
                except Exception: inner = {}
            users = (inner or {}).get('usersMeta') or {}
            for u in users.values():
                email = (u.get('email') or '').strip().lower()
                if not email: continue
                mins = sum(max(0, (iv.get('e', 0) - iv.get('s', 0))) for iv in (u.get('vi') or [])) / 60.0
                k = (email, wdate)
                seen[k] = max(seen.get(k, 0), mins)
            if len(users) < limit: break
            skip += limit
    out = defaultdict(lambda: {'attended': 0, 'attended30': 0})
    per_email = defaultdict(lambda: {'attended': 0, 'attended30': 0, 'minutes': 0.0})
    unknown = set()
    for (email, wdate), mins in seen.items():
        if email in EXCLUDE_EMAILS: continue
        m = members.get(email)
        if not m:
            unknown.add(email)
            m = {'funnel': 'Реклама', 'source': NA, 'medium': NA, 'campaign': NA, 'messenger': NA}
        r = out[(wdate, m['funnel'], m['source'], m['medium'], m['campaign'], m.get('messenger', NA))]
        r['attended'] += 1
        if mins >= 30: r['attended30'] += 1
        pe = per_email[email]
        pe['attended'] = 1; pe['minutes'] = max(pe['minutes'], mins)
        if mins >= 30: pe['attended30'] = 1
    log('Бизон отчётов:', len(reports), 'зрителей (чел.×день):', len(seen), 'без регистрации в GC:', len(unknown))
    return out, per_email, len(unknown)


# ---------------------------------------------------------------- расход
def spend():
    """spend.csv: дата;воронка;источник;канал;сумма  (разделитель ; или ,)"""
    out = defaultdict(float)
    p = ROOT / 'spend.csv'
    if not p.exists(): return out
    txt = p.read_text(encoding='utf-8-sig')
    delim = ';' if txt.count(';') >= txt.count(',') else ','
    for row in csv.DictReader(txt.splitlines(), delimiter=delim):
        row = {k.strip().lower(): (v or '').strip() for k, v in row.items() if k}
        d = row.get('дата') or row.get('date')
        amt = (row.get('сумма') or row.get('spend') or '0').replace(' ', '').replace(',', '.')
        if not d or not amt: continue
        d = dt.datetime.strptime(d, '%d.%m.%Y').date().isoformat() if '.' in d else d[:10]
        funnel = row.get('воронка') or row.get('funnel') or 'Реклама'
        out[(d, funnel, norm(row.get('источник') or row.get('source')), norm(row.get('канал') or row.get('medium')), NA)] += float(amt)
    log('Расход, строк:', len(out))
    return out


# ---------------------------------------------------------------- сборка
def build(env):
    parts = {'metrika': metrika(env)}
    members = gc_members(env)
    orders, paid_by_email = gc_orders(env, members)
    attendance, att_by_email, unknown_viewers = bizon(env, members)
    parts.update({'orders': orders, 'bizon': attendance, 'spend': spend()})
    rows = defaultdict(lambda: {'visits': 0, 'form_open': 0, 'lead_goal': 0, 'leads': 0, 'attended': 0, 'attended30': 0, 'orders': 0, 'paid': 0, 'revenue': 0.0, 'spend': 0.0,
                                'c_attended': 0, 'c_attended30': 0, 'c_paid': 0, 'c_revenue': 0.0})
    for k, v in parts['metrika'].items(): rows[k + (NA,)].update({x: rows[k + (NA,)][x] + v[x] for x in v})  # визиты без мессенджера
    for email, m in members.items():  # когорта: что стало с людьми, зарегистрировавшимися в этот день
        r = rows[(m['date'], m['funnel'], m['source'], m['medium'], m['campaign'], m.get('messenger', NA))]
        r['leads'] += 1
        a, pm = att_by_email.get(email), paid_by_email.get(email)
        if a: r['c_attended'] += a['attended']; r['c_attended30'] += a['attended30']
        if pm and pm['paid']: r['c_paid'] += 1; r['c_revenue'] += pm['revenue']
    for k, v in parts['orders'].items():
        for x in v: rows[k][x] += v[x]
    for k, v in parts['bizon'].items():
        for x in v: rows[k][x] += v[x]
    for k, v in parts['spend'].items(): rows[k + (NA,)]['spend'] += v
    today = dt.datetime.now(MSK).date().isoformat()
    table = []
    for (d, funnel, src, med, camp, msg), v in sorted(rows.items()):
        if d < START.isoformat() or d > today: continue
        table.append(dict(date=d, funnel=funnel, source=src, medium=med, campaign=camp, messenger=msg, **{x: (round(v[x], 2) if isinstance(v[x], float) else v[x]) for x in v}))
    meta = {'members': len(members), 'unknown_viewers': unknown_viewers,
            'next_run': 'автоматически 5 раз в день или кнопкой «Обновить»', 'excluded': len(EXCLUDE_EMAILS)}
    return table, members, meta


def encrypt(payload_json, password):
    """AES-256-GCM, ключ из пароля через PBKDF2-SHA256 (200 000 итераций). Формат: base64(salt16 + iv12 + ciphertext)."""
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
    from cryptography.hazmat.primitives import hashes
    salt, iv = os.urandom(16), os.urandom(12)
    key = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=200000).derive(password.encode('utf-8'))
    ct = AESGCM(key).encrypt(iv, payload_json.encode('utf-8'), None)
    return base64.b64encode(salt + iv + ct).decode('ascii')


def render(table, env, meta=None):
    payload = {'generated': dt.datetime.now(MSK).strftime('%d.%m.%Y %H:%M'), 'start': START.isoformat(), 'rows': table, 'meta': meta or {}}
    pj = json.dumps(payload, ensure_ascii=False)
    tpl = (ROOT / 'dashboard_template.html').read_text(encoding='utf-8')
    (OUT / 'dashboard.html').write_text(tpl.replace('/*__BOOT__*/', 'init(' + pj + ');'), encoding='utf-8')
    pw = env.get('DASHBOARD_PASSWORD')
    if pw:
        docs = ROOT / 'docs'; docs.mkdir(exist_ok=True)
        # токен кнопки «Обновить» (fine-grained, только Actions этого репозитория) — лишь в зашифрованных данных
        enc = dict(payload, meta={**payload['meta'], 'repo': REPO, 'trigger_token': env.get('DASHBOARD_TRIGGER_TOKEN', '')})
        (docs / 'data.enc').write_text(encrypt(json.dumps(enc, ensure_ascii=False), pw), encoding='ascii')
        boot = "const DATA_URL = (window.DASHBOARD_DATA_URL || 'data.enc'); bootEncrypted(DATA_URL);"
        (docs / 'index.html').write_text(tpl.replace('/*__BOOT__*/', boot), encoding='utf-8')
        log('Зашифрованные данные: docs/data.enc')


def main():
    t0 = time.time()
    log('Старт', dt.datetime.now(MSK).strftime('%d.%m.%Y %H:%M'))
    env = load_env()
    table, members, meta = build(env)
    (DATA / 'funnel_daily.json').write_text(json.dumps(table, ensure_ascii=False, indent=1), encoding='utf-8')
    with open(DATA / 'funnel_daily.csv', 'w', newline='', encoding='utf-8-sig') as f:
        w = csv.DictWriter(f, fieldnames=list(table[0].keys()) if table else ['date'], delimiter=';')
        w.writeheader(); w.writerows(table)  # data/ не попадает в репозиторий (.gitignore)
    render(table, env, meta)
    tot = {k: sum(r[k] for r in table) for k in ('visits', 'leads', 'attended', 'attended30', 'orders', 'paid', 'revenue', 'spend')}
    log('Итого с', START.isoformat(), tot)
    log('Готово за %.0f c → %s' % (time.time() - t0, OUT / 'dashboard.html'))


if __name__ == '__main__':
    try:
        main()
    except Exception:
        log('ОШИБКА:\n' + traceback.format_exc())
        sys.exit(1)
    finally:
        (LOGS / ('update-%s.log' % dt.date.today().isoformat())).write_text('\n'.join(log_lines), encoding='utf-8')
