#!/usr/bin/python3
# -*- coding: utf-8 -*-
"""
WSGI configuration for Sprinthost/Timeweb shared hosting
"""

import sys
import os

# Получаем путь к директории приложения
INTERP = os.path.expanduser("~/domains/orel-ai.ru/venv/bin/python3")
if sys.executable != INTERP:
    os.execl(INTERP, INTERP, *sys.argv)

# Добавляем путь к приложению в sys.path
sys.path.insert(0, os.path.dirname(__file__))

# Импортируем Flask приложение
from app import app as application

# Для совместимости с Passenger
if __name__ == '__main__':
    application.run()
