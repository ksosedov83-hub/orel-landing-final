# Руководство по развертыванию на SprintHost

## Данные для доступа
- **URL панели управления:** https://cp.sprinthost.ru/auth/login
- **Логин:** a1172204
- **Пароль:** erkeafacve

## Шаги для развертывания

### 1. Подключение по SSH (если доступно)

Если у вас есть SSH доступ, используйте:
```bash
ssh a1172204@your-domain.ru
```

### 2. Загрузка файлов на хостинг

#### Вариант A: Через FTP/SFTP
1. Откройте FTP-клиент (например, FileZilla)
2. Подключитесь с данными:
   - Хост: ftp.sprinthost.ru (или IP из панели)
   - Логин: a1172204
   - Пароль: erkeafacve
3. Загрузите все файлы в директорию `public_html` или `domains/YOUR_DOMAIN/public_html`

#### Вариант B: Через панель управления
1. Войдите в панель https://cp.sprinthost.ru/auth/login
2. Перейдите в "Файловый менеджер"
3. Загрузите все файлы проекта

### 3. Установка Python и зависимостей

После загрузки файлов подключитесь по SSH и выполните:

```bash
# Перейдите в директорию сайта
cd ~/domains/YOUR_DOMAIN/public_html

# Создайте виртуальное окружение Python
python3 -m venv venv

# Активируйте виртуальное окружение
source venv/bin/activate

# Установите зависимости
pip install -r requirements.txt
```

### 4. Настройка .htaccess

Отредактируйте файл `.htaccess` и замените:
- `YOUR_DOMAIN` на ваш реальный домен
- `YOUR_VIRTUALENV_NAME` на путь к виртуальному окружению

Пример:
```apache
PassengerAppRoot /home/a1172204/domains/example.com/public_html
PassengerPython /home/a1172204/domains/example.com/public_html/venv/bin/python
```

### 5. Структура файлов на хостинге

После загрузки структура должна выглядеть так:
```
public_html/
├── venv/                  # Виртуальное окружение Python
├── static/                # Статические файлы
│   ├── index.html
│   ├── assets/
│   └── favicon.ico
├── app.py                 # Основное Flask приложение
├── passenger_wsgi.py      # Точка входа для Passenger
├── requirements.txt       # Зависимости Python
├── .htaccess             # Конфигурация Apache
└── submissions.json       # Файл для хранения заявок
```

### 6. Настройка прав доступа

Установите правильные права на файлы:
```bash
# Права на директории
find . -type d -exec chmod 755 {} \;

# Права на файлы
find . -type f -exec chmod 644 {} \;

# Права на файл для записи заявок
chmod 666 submissions.json

# Права на Python файлы
chmod 644 *.py
```

### 7. Проверка работы

1. Откройте ваш домен в браузере
2. Проверьте, что сайт открывается
3. Проверьте работу формы обратной связи
4. Убедитесь, что уведомления приходят в Telegram

### 8. Проверка логов

Если что-то не работает, проверьте логи:
```bash
# В панели управления SprintHost
# Перейдите в раздел "Логи" или "Статистика"
# Там будут доступны логи ошибок Apache
```

## Альтернативный вариант: Без Passenger

Если на хостинге не поддерживается Passenger, можно использовать CGI:

### Создайте файл `index.cgi`:
```python
#!/usr/bin/env python3
import sys
import os

# Путь к виртуальному окружению
venv_path = '/home/a1172204/domains/YOUR_DOMAIN/public_html/venv'
sys.path.insert(0, venv_path + '/lib/python3.x/site-packages')

# Добавьте текущую директорию в путь
sys.path.insert(0, os.path.dirname(__file__))

# Импорт приложения
from app import app

# Запуск через CGI
from wsgiref.handlers import CGIHandler
CGIHandler().run(app)
```

И обновите `.htaccess`:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.cgi/$1 [L]
```

## Решение проблем

### Ошибка 500 Internal Server Error
1. Проверьте логи Apache
2. Убедитесь, что все пути в `.htaccess` правильные
3. Проверьте права доступа на файлы
4. Убедитесь, что все зависимости установлены

### Telegram не получает уведомления
1. Проверьте токен бота в `app.py` (строка 12)
2. Проверьте Chat ID в `app.py` (строка 13)
3. Убедитесь, что бот может отправлять сообщения

### Не открывается сайт
1. Проверьте, что домен правильно привязан в панели управления
2. Убедитесь, что DNS записи настроены
3. Проверьте файл `.htaccess`

## Контакты поддержки

Если возникли проблемы:
1. Техподдержка SprintHost: https://sprinthost.ru/support
2. Документация SprintHost: https://sprinthost.ru/wiki

## Безопасность

**ВАЖНО:** После развертывания рекомендуется:
1. Изменить пароль от панели управления
2. Настроить SSL-сертификат (Let's Encrypt бесплатно)
3. Регулярно обновлять зависимости Python
4. Делать резервные копии базы данных заявок

## Обновление сайта

Для обновления сайта:
1. Загрузите обновленные файлы через FTP
2. Если изменились зависимости, обновите их:
   ```bash
   source venv/bin/activate
   pip install -r requirements.txt --upgrade
   ```
3. Перезапустите приложение:
   ```bash
   touch tmp/restart.txt
   ```
   или через панель управления SprintHost
