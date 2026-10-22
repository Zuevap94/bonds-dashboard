#!/bin/bash
# Обёртка для cron/launchd: запускает сборку и пишет лог. Работает на Mac и на Linux.
cd "$(dirname "$0")" || exit 1
mkdir -p logs
python3 update_dashboard.py >> "logs/cron.log" 2>&1
