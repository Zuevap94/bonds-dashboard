"""Проверка ключей из keys.env: делает по одному запросу на чтение в каждый сервис.
Значения ключей не печатаются."""
import json, pathlib, urllib.request, urllib.parse, urllib.error

ROOT = pathlib.Path(__file__).parent


def load_env():
    kv = {}
    for line in (ROOT / 'keys.env').read_text(encoding='utf-8').splitlines():
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            k, v = line.split('=', 1)
            kv[k.strip()] = v.strip()
    return kv


def get(url, headers=None, data=None):
    req = urllib.request.Request(url, data=data, headers=headers or {})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, r.read().decode('utf-8', 'replace')
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8', 'replace')
    except Exception as e:  # сеть, таймаут
        return 0, repr(e)


def main():
    env = load_env()

    # Яндекс Метрика: визиты за 7 дней по обоим счётчикам
    for name in ('METRIKA_COUNTER_ADS', 'METRIKA_COUNTER_ORGANIC'):
        q = urllib.parse.urlencode({'ids': env[name], 'metrics': 'ym:s:visits', 'date1': '7daysAgo', 'date2': 'today'})
        st, body = get('https://api-metrika.yandex.net/stat/v1/data?' + q, {'Authorization': 'OAuth ' + env['METRIKA_TOKEN']})
        try:
            total = json.loads(body).get('totals')
        except Exception:
            total = body[:150]
        print('Метрика', name, st, total if st == 200 else body[:200])

    # Бизон: список отчётов вебинаров
    st, body = get('https://online.bizon365.ru/api/v1/webinars/reports/getlist?skip=0&limit=3',
                   {'X-Token': env['BIZON_TOKEN']})
    try:
        j = json.loads(body)
        info = {'count': j.get('count'), 'rooms': [x.get('name') for x in j.get('list', [])][:3]}
    except Exception:
        info = body[:200]
    print('Бизон', st, info)

    # GetCourse: запуск выгрузки заказов за вчера-сегодня (только чтение)
    acc = env['GETCOURSE_ACCOUNT']
    q = urllib.parse.urlencode({'key': env['GETCOURSE_KEY'], 'created_at[from]': '2026-10-22'})
    st, body = get('https://%s.getcourse.ru/pl/api/account/deals?%s' % (acc, q))
    try:
        j = json.loads(body)
        info = {'success': j.get('success'), 'export_id': (j.get('info') or {}).get('export_id'),
                'error': j.get('error_message') or (j.get('info') or {}).get('error_message')}
    except Exception:
        info = body[:200]
    print('GetCourse', st, info)


if __name__ == '__main__':
    main()
