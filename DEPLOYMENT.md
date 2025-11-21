# Инструкция по развертыванию на Sprinthost

## Предварительные требования

1. Аккаунт на Sprinthost с доступом к хостингу Python
2. Доступ по SSH к серверу
3. Python 3.8 или выше на сервере

## Шаги развертывания

### 1. Подключение к серверу

```bash
ssh your_username@your_server.sprinthost.ru
```

### 2. Клонирование репозитория

```bash
cd ~/
git clone https://github.com/your-username/orel-landing-final.git
cd orel-landing-final
```

### 3. Создание виртуального окружения

```bash
python3 -m venv venv
source venv/bin/activate
```

### 4. Установка зависимостей

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 5. Настройка переменных окружения

Создайте файл `.env` на основе `.env.example`:

```bash
cp .env.example .env
nano .env
```

Заполните необходимые переменные:
- `TELEGRAM_BOT_TOKEN` - токен вашего Telegram бота
- `TELEGRAM_CHAT_ID` - ID чата для получения уведомлений

### 6. Настройка .htaccess

Откройте файл `.htaccess` и измените пути:

```bash
nano .htaccess
```

Замените:
- `/home/path/to/your/orel-landing-final` на полный путь к вашему проекту
- `/home/path/to/your/venv/bin/python3` на полный путь к Python в виртуальном окружении

Например:
```apache
PassengerAppRoot /home/username/orel-landing-final
PassengerPython /home/username/orel-landing-final/venv/bin/python3
```

### 7. Создание файла submissions.json

```bash
touch submissions.json
chmod 644 submissions.json
```

### 8. Настройка прав доступа

```bash
chmod 755 ~/orel-landing-final
chmod 644 ~/orel-landing-final/.htaccess
chmod 644 ~/orel-landing-final/passenger_wsgi.py
chmod 644 ~/orel-landing-final/app.py
```

### 9. Перезапуск приложения

Создайте файл `tmp/restart.txt` для перезапуска приложения:

```bash
mkdir -p tmp
touch tmp/restart.txt
```

## Обновление приложения

Для обновления приложения после изменений в коде:

```bash
cd ~/orel-landing-final
git pull origin main
source venv/bin/activate
pip install -r requirements.txt
touch tmp/restart.txt
```

## Проверка работоспособности

1. Откройте ваш сайт в браузере
2. Проверьте эндпоинт здоровья: `https://your-domain.ru/health`
3. Отправьте тестовую форму и проверьте получение уведомления в Telegram

## Настройка домена

В панели управления Sprinthost:

1. Перейдите в раздел "Домены"
2. Добавьте ваш домен
3. Укажите корневую директорию: `/home/username/orel-landing-final`
4. Включите SSL сертификат (Let's Encrypt)

## Мониторинг и логи

Логи Passenger можно просмотреть в:
```bash
tail -f ~/orel-landing-final/log/passenger.log
```

## Решение проблем

### Приложение не запускается

1. Проверьте права доступа к файлам
2. Убедитесь, что пути в `.htaccess` указаны правильно
3. Проверьте, что виртуальное окружение активировано
4. Проверьте логи: `tail -f log/passenger.log`

### 502 Bad Gateway

1. Проверьте, что все зависимости установлены
2. Перезапустите приложение: `touch tmp/restart.txt`
3. Проверьте наличие файла `passenger_wsgi.py`

### Форма не отправляется

1. Проверьте переменные окружения в `.env`
2. Проверьте токен Telegram бота
3. Убедитесь, что файл `submissions.json` существует и доступен для записи

## Контакты поддержки

- Документация Sprinthost: https://www.sprinthost.ru/help/
- Telegram Support: @sprinthost_support
