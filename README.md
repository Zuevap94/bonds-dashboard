# Дашборд воронки «Облигации 2026»

Сборка данных идёт в GitHub Actions каждый день в 09:30 МСК (workflow `dashboard`), результат — зашифрованный файл `docs/data.enc`.
Страница дашборда (на Тильде и на `docs/index.html`) спрашивает пароль, расшифровывает файл в браузере и рисует цифры.
В репозитории нет ни ключей, ни открытых данных.

## Файлы
- `update_dashboard.py` — сборщик: Яндекс Метрика + GetCourse + Бизон + `spend.csv` → `docs/data.enc` (и локально `out/dashboard.html`).
- `dashboard_template.html` — вёрстка и логика дашборда; одна и та же для локальной версии, `docs/index.html` и блока на Тильде.
- `spend.csv` — расход на рекламу, заполняется руками: `дата;воронка;источник;канал;сумма` (дата `23.10.2026` или `2026-10-23`). После правки — commit, цифры подтянутся при следующей сборке.
- `.github/workflows/dashboard.yml` — расписание и публикация.
- `check_keys.py` — проверка ключей (локально).

## Секреты (Settings → Secrets and variables → Actions)
`GETCOURSE_KEY`, `BIZON_TOKEN`, `METRIKA_TOKEN`, `DASHBOARD_PASSWORD` (пароль страницы = ключ шифрования), `EXCLUDE_EMAILS` (тестовые адреса через запятую).
Несекретные настройки (аккаунт GetCourse, номера счётчиков) заданы в workflow.

## Запустить сборку вручную
Actions → dashboard → Run workflow. Или локально: `keys.env` рядом со скриптом, `.venv/bin/python update_dashboard.py`.

## Как считается
См. блок «Как считается» внизу дашборда. Настройки в начале скрипта: дата старта, группы GetCourse, комнаты Бизона.
Новые боты (Telegram / MAX, вебинар / инструкция) подхватятся сами, если Vakas ставит пользователю UTM (канал = utm_medium: telegram / max).
