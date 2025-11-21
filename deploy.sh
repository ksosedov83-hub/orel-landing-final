#!/bin/bash

# Скрипт для быстрого развертывания на Sprinthost
# Использование: bash deploy.sh

echo "==================================="
echo "Развертывание ОРЁЛ на Sprinthost"
echo "==================================="
echo ""

# Цвета для вывода
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функция для вывода успеха
success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Функция для вывода ошибки
error() {
    echo -e "${RED}✗ $1${NC}"
}

# Функция для вывода предупреждения
warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Проверка текущей директории
CURRENT_DIR=$(pwd)
echo "Текущая директория: $CURRENT_DIR"
echo ""

# Шаг 1: Проверка Python
echo "[Шаг 1/8] Проверка Python..."
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    success "Python найден: $PYTHON_VERSION"
else
    error "Python3 не найден!"
    exit 1
fi
echo ""

# Шаг 2: Создание виртуального окружения
echo "[Шаг 2/8] Создание виртуального окружения..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    success "Виртуальное окружение создано"
else
    warning "Виртуальное окружение уже существует"
fi
echo ""

# Шаг 3: Активация виртуального окружения и установка зависимостей
echo "[Шаг 3/8] Установка зависимостей..."
source venv/bin/activate
pip install --upgrade pip > /dev/null 2>&1
pip install -r requirements.txt
success "Зависимости установлены"
echo ""

# Шаг 4: Создание необходимых директорий
echo "[Шаг 4/8] Создание директорий..."
mkdir -p tmp
mkdir -p logs
touch submissions.json
success "Директории созданы"
echo ""

# Шаг 5: Установка прав доступа
echo "[Шаг 5/8] Установка прав доступа..."
chmod 755 .
chmod 755 static
chmod 755 static/assets 2>/dev/null || true
chmod 644 .htaccess
chmod 755 passenger_wsgi.py
chmod 644 app.py
chmod 666 submissions.json
success "Права доступа установлены"
echo ""

# Шаг 6: Получение имени пользователя и пути
echo "[Шаг 6/8] Определение конфигурации..."
USERNAME=$(whoami)
HOME_DIR=$(echo $HOME)
FULL_PATH="$HOME_DIR/domains/orel-ai.ru"
success "Пользователь: $USERNAME"
success "Домашняя директория: $HOME_DIR"
success "Путь к проекту: $FULL_PATH"
echo ""

# Шаг 7: Обновление конфигурации
echo "[Шаг 7/8] Обновление конфигурации..."
warning "ВАЖНО: Необходимо вручную обновить следующие файлы:"
echo "1. В файле .htaccess замените USERNAME на: $USERNAME"
echo "2. В файле passenger_wsgi.py замените путь на: $FULL_PATH/venv/bin/python3"
echo ""
echo "Для редактирования используйте:"
echo "  nano .htaccess"
echo "  nano passenger_wsgi.py"
echo ""

# Шаг 8: Перезапуск приложения
echo "[Шаг 8/8] Перезапуск приложения..."
touch tmp/restart.txt
success "Приложение перезапущено"
echo ""

# Финал
echo "==================================="
echo "Развертывание завершено!"
echo "==================================="
echo ""
echo "Следующие шаги:"
echo "1. Отредактируйте .htaccess (замените USERNAME)"
echo "2. Отредактируйте passenger_wsgi.py (замените путь)"
echo "3. Проверьте работу сайта: http://orel-ai.ru"
echo "4. Проверьте API: http://orel-ai.ru/health"
echo ""
echo "Для перезапуска приложения в будущем:"
echo "  touch tmp/restart.txt"
echo ""
echo "Для просмотра логов:"
echo "  tail -f ~/logs/error.log"
echo ""
