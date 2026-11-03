#!/usr/bin/env python3
"""Собирает дашборд для Тильды из dashboard_template.html.
docs/dashboard.js — весь код дашборда (стили + скрипт), лежит в репозитории рядом с data.enc.
out/tilda-block.html — короткий загрузчик для блока T123: тянет docs/dashboard.js из GitHub,
поэтому после правки шаблона блок на Тильде менять не нужно — достаточно запушить dashboard.js."""
import json, pathlib, re

ROOT = pathlib.Path(__file__).parent
RAW = 'https://raw.githubusercontent.com/Zuevap94/bonds-dashboard/main/docs/'
DATA_URL = RAW + 'data.enc'
FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&display=swap">'


def build_js(tpl):
    css = re.search(r'<style>(.*?)</style>', tpl, re.S).group(1).strip()
    js = re.search(r'<script>(.*?)</script>', tpl, re.S).group(1).strip()
    # на Тильде нет своего body: фон и шрифт вешаем на страницу и на контейнер блока
    css = css.replace('body{margin:0;background:var(--cream);color:var(--ink);',
                      'html,body{background:var(--cream)!important}\n.zd{min-height:100vh;color:var(--ink);')
    js = js.replace('/*__BOOT__*/', f"window.DASHBOARD_DATA_URL='{DATA_URL}';bootEncrypted(window.DASHBOARD_DATA_URL);")
    return ('/* Дашборд воронки «Облигации 2026» — собирается из dashboard_template.html (make_tilda_block.py), руками не править */\n'
            f'(function(){{var s=document.createElement("style");s.textContent={json.dumps(css, ensure_ascii=False)};document.head.appendChild(s);}})();\n'
            + js + '\n')


LOADER = f"""<!-- Дашборд воронки «Облигации 2026». Код (docs/dashboard.js) и зашифрованные данные (docs/data.enc) — в GitHub Zuevap94/bonds-dashboard. -->
{FONTS}
<div class="zd" id="zd"><div style="padding:80px 16px;text-align:center;color:#6E6A5E;font:14px Manrope,Arial,sans-serif">Загружаю дашборд…</div></div>
<script>
(function () {{
  fetch('{RAW}dashboard.js?t=' + Date.now(), {{ cache: 'no-store' }})
    .then(function (r) {{ if (!r.ok) throw new Error(r.status); return r.text(); }})
    .then(function (code) {{ var s = document.createElement('script'); s.textContent = code; document.body.appendChild(s); }})
    .catch(function () {{ document.getElementById('zd').innerHTML = '<div style="padding:80px 16px;text-align:center;font:14px Arial,sans-serif">Не удалось загрузить дашборд. Обновите страницу.</div>'; }});
}})();
</script>"""


def write(tpl=None):
    tpl = tpl or (ROOT / 'dashboard_template.html').read_text(encoding='utf-8')
    (ROOT / 'docs').mkdir(exist_ok=True); (ROOT / 'out').mkdir(exist_ok=True)
    js = build_js(tpl)
    (ROOT / 'docs' / 'dashboard.js').write_text(js, encoding='utf-8')
    (ROOT / 'out' / 'tilda-block.html').write_text(LOADER, encoding='utf-8')
    return len(js)


if __name__ == '__main__':
    print('ok', write(), 'bytes → docs/dashboard.js; загрузчик → out/tilda-block.html')
