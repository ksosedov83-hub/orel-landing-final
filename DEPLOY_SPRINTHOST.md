# Инструкция по развертыванию на Sprinthost Shared Hosting

## Требования
- Shared-хостинг Sprinthost (Timeweb/Джино) с поддержкой Python 3
- SSH доступ к хостингу
- Домен orel-ai.ru привязан к хостингу

## Структура проекта на хостинге

```
~/domains/orel-ai.ru/
├── venv/                    # Виртуальное окружение Python
├── app.py                   # Основное Flask приложение
├── passenger_wsgi.py        # WSGI файл для Passenger
├── .htaccess               # Конфигурация Apache
├── requirements.txt        # Зависимости Python
├── submissions.json        # Файл с заявками
└── static/                 # Статические файлы
    ├── index.html
    ├── favicon.ico
    └── assets/
```

## Пошаговая инструкция развертывания

### Шаг 1: Подключение по SSH

```bash
ssh USERNAME@orel-ai.ru
# или
ssh USERNAME@sprinthost_server_address
```

### Шаг 2: Переход в директорию домена

```bash
cd ~/domains/orel-ai.ru/
```

### Шаг 3: Создание виртуального окружения Python

```bash
# Проверяем версию Python
python3 --version

# Создаем виртуальное окружение
python3 -m venv venv

# Активируем виртуальное окружение
source venv/bin/activate
```

### Шаг 4: Загрузка файлов проекта

**Вариант A: Через Git (рекомендуется)**

```bash
# Если Git доступен на хостинге
cd ~/domains/orel-ai.ru/
git clone https://github.com/ksosedov83-hub/orel-landing-final.git temp_repo
mv temp_repo/* .
mv temp_repo/.htaccess .
rm -rf temp_repo
```

**Вариант B: Через SCP с локальной машины**

```bash
# На локальной машине:
cd /path/to/orel-landing-final
scp -r * USERNAME@orel-ai.ru:~/domains/orel-ai.ru/
scp .htaccess USERNAME@orel-ai.ru:~/domains/orel-ai.ru/
```

**Вариант C: Через FileZilla (GUI)**

1. Откройте FileZilla
2. Подключитесь через SFTP:
   - Хост: orel-ai.ru
   - Порт: 22
   - Пользователь: ваш SSH пользователь
   - Пароль: ваш SSH пароль
3. Перейдите в `/domains/orel-ai.ru/`
4. Загрузите все файлы из локальной папки проекта

### Шаг 5: Установка зависимостей

```bash
cd ~/domains/orel-ai.ru/
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

### Шаг 6: Настройка .htaccess

Откройте файл `.htaccess` и замените `USERNAME` на ваше имя пользователя:

```bash
nano .htaccess
```

Замените:
- `/home/USERNAME/` на `/home/ВАШ_ПОЛЬЗОВАТЕЛЬ/`

Пример:
```apache
PassengerAppRoot /home/u12345/domains/orel-ai.ru
PassengerPython /home/u12345/domains/orel-ai.ru/venv/bin/python3
```

Сохраните файл (Ctrl+O, Enter, Ctrl+X)

### Шаг 7: Настройка passenger_wsgi.py

Откройте файл `passenger_wsgi.py` и замените путь:

```bash
nano passenger_wsgi.py
```

Замените:
- `~/domains/orel-ai.ru/venv/bin/python3` на полный путь

Пример:
```python
INTERP = os.path.expanduser("/home/u12345/domains/orel-ai.ru/venv/bin/python3")
```

### Шаг 8: Установка правильных прав доступа

```bash
cd ~/domains/orel-ai.ru/

# Права на директории
chmod 755 .
chmod 755 static
chmod 755 static/assets

# Права на файлы
chmod 644 .htaccess
chmod 755 passenger_wsgi.py
chmod 644 app.py
chmod 644 requirements.txt

# Права на файл с заявками
touch submissions.json
chmod 666 submissions.json
```

### Шаг 9: Перезапуск приложения

```bash
# Создаем/обновляем файл restart.txt для перезапуска Passenger
mkdir -p tmp
touch tmp/restart.txt
```

### Шаг 10: Проверка работы

1. Откройте браузер и перейдите на `http://orel-ai.ru`
2. Проверьте, что сайт загружается
3. Проверьте API endpoint: `http://orel-ai.ru/health`
4. Проверьте отправку формы на главной странице

## Настройка SSL (HTTPS)

В панели управления Sprinthost:

1. Перейдите в раздел "SSL-сертификаты"
2. Выберите домен orel-ai.ru
3. Установите бесплатный Let's Encrypt сертификат
4. После установки раскомментируйте строки в `.htaccess`:

```apache
# Принудительный HTTPS
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
```

## Мониторинг логов

```bash
# Логи Passenger (если доступны)
tail -f ~/domains/orel-ai.ru/log/passenger.log

# Логи Apache
tail -f ~/logs/error.log
tail -f ~/logs/access.log
```

## Обновление приложения

```bash
cd ~/domains/orel-ai.ru/

# Если через Git
git pull origin main

# Активируем venv и обновляем зависимости
source venv/bin/activate
pip install -r requirements.txt

# Перезапускаем приложение
touch tmp/restart.txt
```

## Устранение неполадок

### Ошибка 500 Internal Server Error

1. Проверьте логи:
   ```bash
   tail -50 ~/logs/error.log
   ```

2. Проверьте права доступа:
   ```bash
   ls -la ~/domains/orel-ai.ru/
   ```

3. Проверьте путь к Python в `.htaccess` и `passenger_wsgi.py`

### Приложение не запускается

1. Проверьте виртуальное окружение:
   ```bash
   source ~/domains/orel-ai.ru/venv/bin/activate
   python --version
   python -c "import flask; print(flask.__version__)"
   ```

2. Проверьте синтаксис Python:
   ```bash
   python ~/domains/orel-ai.ru/app.py
   ```

3. Перезапустите приложение:
   ```bash
   touch ~/domains/orel-ai.ru/tmp/restart.txt
   ```

### Статические файлы не загружаются

1. Проверьте структуру директорий:
   ```bash
   ls -la ~/domains/orel-ai.ru/static/
   ```

2. Проверьте права доступа:
   ```bash
   chmod -R 755 ~/domains/orel-ai.ru/static/
   ```

### Заявки не сохраняются

1. Проверьте права на файл:
   ```bash
   chmod 666 ~/domains/orel-ai.ru/submissions.json
   ```

2. Проверьте, что файл существует и доступен для записи

### Telegram уведомления не приходят

1. Проверьте настройки в `app.py`:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`

2. Проверьте соединение с интернетом:
   ```bash
   curl https://api.telegram.org/bot<YOUR_TOKEN>/getMe
   ```

## Полезные команды

```bash
# Узнать свое имя пользователя
whoami

# Узнать полный путь к домашней директории
echo $HOME

# Проверить версию Python
python3 --version

# Проверить установленные пакеты
pip list

# Очистить кэш Python
find . -type d -name "__pycache__" -exec rm -r {} +

# Перезапустить приложение
touch tmp/restart.txt

# Просмотр процессов Python
ps aux | grep python
```

## Контакты поддержки

- Документация Sprinthost: https://sprinthost.ru/support
- Документация Timeweb: https://timeweb.com/ru/help
- Документация Passenger: https://www.phusionpassenger.com/docs/

## Дополнительная информация

### Структура виртуального окружения

```
venv/
├── bin/
│   ├── python3 -> python
│   ├── pip
│   └── activate
├── lib/
│   └── python3.x/
│       └── site-packages/
└── pyvenv.cfg
```

### Переменные окружения в .htaccess

Если нужно добавить дополнительные переменные окружения:

```apache
SetEnv DATABASE_URL "your_database_url"
SetEnv SECRET_KEY "your_secret_key"
```

### Настройка производительности

В `.htaccess` можно настроить:

```apache
PassengerMinInstances 1      # Минимум инстансов
PassengerMaxPoolSize 6       # Максимум процессов
PassengerPoolIdleTime 300    # Время простоя (секунды)
```

### Автоматическая загрузка через GitHub Actions (опционально)

Можно настроить автоматическую загрузку через SSH при push в репозиторий.

Создайте файл `.github/workflows/deploy.yml` в репозитории (это дополнительная опция, не обязательная).
