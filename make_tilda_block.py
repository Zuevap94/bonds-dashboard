#!/usr/bin/env python3
"""Собирает HTML-код блока T123 для Тильды из dashboard_template.html.
Результат — out/tilda-block.html: вставляется в блок как есть, данные тянутся из GitHub (docs/data.enc)."""
import pathlib, re

ROOT = pathlib.Path(__file__).parent
DATA_URL = 'https://raw.githubusercontent.com/Zuevap94/bonds-dashboard/main/docs/data.enc'

tpl = (ROOT / 'dashboard_template.html').read_text(encoding='utf-8')
css = re.search(r'<style>(.*?)</style>', tpl, re.S).group(1).strip()
js = re.search(r'<script>(.*?)</script>', tpl, re.S).group(1).strip()
fonts = re.search(r'<link rel="stylesheet"[^>]+>', tpl).group(0)

# на Тильде нет своего body: фон и шрифт вешаем на страницу и на контейнер блока
css = css.replace('body{margin:0;background:var(--cream);color:var(--ink);',
                  'html,body{background:var(--cream)!important}\n.zd{min-height:100vh;color:var(--ink);')
js = js.replace('/*__BOOT__*/', f"window.DASHBOARD_DATA_URL='{DATA_URL}';bootEncrypted(window.DASHBOARD_DATA_URL);")

block = f"""<!-- Дашборд воронки «Облигации 2026». Данные: GitHub Zuevap94/bonds-dashboard (зашифрованы, пароль вводится на странице). -->
{fonts}
<style>
{css}
</style>
<div class="zd" id="zd"></div>
<script>
{js}
</script>"""
out = ROOT / 'out'; out.mkdir(exist_ok=True)
(out / 'tilda-block.html').write_text(block, encoding='utf-8')
print('ok', len(block), 'bytes → out/tilda-block.html')
