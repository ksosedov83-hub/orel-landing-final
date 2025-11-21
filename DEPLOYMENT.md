# Инструкция по развертыванию на Sprinthost

## Предварительные требования

1. Активный хостинг на Sprinthost с поддержкой Python
2. Доступ по SSH к серверу
3. Домен, привязанный к хостингу

## Шаг 1: Подключение по SSH

```bash
ssh username@your-server.sprinthost.ru
```

Замените `username` на ваше имя пользователя и `your-server.sprinthost.ru` на адрес вашего сервера.

## Шаг 2: Создание виртуального окружения Python

```bash
cd ~
mkdir -p .virtualenv
cd .virtualenv
python3 -m venv orel-landing
source orel-landing/bin/activate
```

## Шаг 3: Загрузка файлов проекта

### Вариант A: Через Git (рекомендуется)

```bash
cd ~/domains/YOURDOMAIN.com/public_html
git clone https://github.com/ksosedov83-hub/orel-landing-final.git .
```

### Вариант B: Через FTP/SFTP

1. Подключитесь к серверу через FileZilla или другой FTP-клиент
2. Загрузите все файлы проекта в директорию `~/domains/YOURDOMAIN.com/public_html`

## Шаг 4: Установка зависимостей

```bash
cd ~/domains/YOURDOMAIN.com/public_html
source ~/.virtualenv/orel-landing/bin/activate
pip install -r requirements.txt
```

## Шаг 5: Настройка .htaccess

Откройте файл `.htaccess` и замените:
- `USERNAME` на ваше имя пользователя на Sprinthost
- `YOURDOMAIN.com` на ваш домен

```apache
PassengerEnabled On
PassengerAppRoot /home/USERNAME/domains/YOURDOMAIN.com/public_html
PassengerStartupFile passenger_wsgi.py
PassengerAppType wsgi
PassengerPython /home/USERNAME/.virtualenv/orel-landing/bin/python3
```

## Шаг 6: Настройка прав доступа

```bash
chmod 755 ~/domains/YOURDOMAIN.com/public_html
chmod 644 ~/domains/YOURDOMAIN.com/public_html/.htaccess
chmod 644 ~/domains/YOURDOMAIN.com/public_html/passenger_wsgi.py
chmod 666 ~/domains/YOURDOMAIN.com/public_html/submissions.json
```

## Шаг 7: Создание директории для перезапуска

```bash
mkdir -p ~/domains/YOURDOMAIN.com/public_html/tmp
```

## Шаг 8: Запуск приложения

Для перезапуска приложения создайте или обновите файл:

```bash
touch ~/domains/YOURDOMAIN.com/public_html/tmp/restart.txt
```

## Шаг 9: Проверка работы

Откройте ваш домен в браузере. Вы должны увидеть главную страницу сайта ОРЁЛ.

Проверьте работу API:
```bash
curl https://YOURDOMAIN.com/health
```

Ответ должен быть: `{"status":"ok"}`

## Обновление приложения

После внесения изменений в код:

```bash
cd ~/domains/YOURDOMAIN.com/public_html
git pull  # если используете Git
touch tmp/restart.txt  # перезапуск приложения
```

## Решение проблем

### Ошибка 500 - Internal Server Error

1. Проверьте логи:
```bash
tail -f ~/domains/YOURDOMAIN.com/logs/error.log
```

2. Убедитесь, что виртуальное окружение активировано и все зависимости установлены:
```bash
source ~/.virtualenv/orel-landing/bin/activate
pip list
```

3. Проверьте права доступа к файлам

### Приложение не запускается

1. Убедитесь, что путь к Python в `.htaccess` правильный:
```bash
which python3
```

2. Проверьте, что `passenger_wsgi.py` содержит правильный путь к виртуальному окружению

### Формы не отправляются

1. Проверьте, что файл `submissions.json` имеет права на запись (666)
2. Проверьте настройки Telegram Bot Token в `app.py`

## Безопасность

⚠️ **ВАЖНО**: После развертывания рекомендуется:

1. Переместить секретные данные (Telegram Bot Token) в переменные окружения
2. Настроить HTTPS для безопасной передачи данных
3. Регулярно обновлять зависимости: `pip install -U -r requirements.txt`

## Контакты поддержки

Если возникли проблемы с хостингом, обратитесь в техподдержку Sprinthost:
- Email: support@sprinthost.ru
- Телефон: указан в личном кабинете
