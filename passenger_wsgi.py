import sys
import os

# Добавляем путь к приложению
sys.path.insert(0, os.path.dirname(__file__))

# Импортируем приложение Flask
from app import app as application

# Для совместимости с Passenger
if __name__ == '__main__':
    application.run()
