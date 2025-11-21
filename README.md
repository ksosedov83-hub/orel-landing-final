# ОРЁЛ - Landing Page

Лендинг для компании ОРЁЛ с интеграцией Telegram уведомлений.

## Стек технологий

- **Backend**: Flask (Python)
- **Frontend**: React + Vite
- **Уведомления**: Telegram Bot API
- **Хостинг**: Sprinthost

## Быстрый старт (Локальная разработка)

### Установка зависимостей

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Настройка переменных окружения

Создайте файл `.env`:

```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_chat_id
FLASK_DEBUG=True
```

### Запуск приложения

```bash
python app.py
```

Приложение будет доступно по адресу: http://localhost:5000

## Развертывание на Sprinthost

Подробная инструкция по развертыванию находится в файле [DEPLOYMENT.md](DEPLOYMENT.md).

### Краткие шаги:

1. Клонировать репозиторий на сервер
2. Создать виртуальное окружение и установить зависимости
3. Настроить `.env` с реальными токенами
4. Обновить пути в `.htaccess`
5. Перезапустить приложение через `tmp/restart.txt`

## Структура проекта

```
orel-landing-final/
├── app.py                 # Flask приложение
├── passenger_wsgi.py      # WSGI entry point для Passenger
├── requirements.txt       # Python зависимости
├── .htaccess             # Конфигурация Apache
├── .env.example          # Пример переменных окружения
├── static/               # Статические файлы (React build)
│   ├── index.html
│   ├── assets/
│   └── favicon.ico
├── submissions.json      # Данные заявок (не в git)
├── DEPLOYMENT.md         # Инструкция по развертыванию
└── README.md            # Этот файл
```

## API Endpoints

- `GET /` - Главная страница
- `POST /api/submit-form` - Отправка формы заявки
- `GET /health` - Проверка состояния приложения

## Безопасность

- Токены хранятся в переменных окружения (не в коде)
- Файл `submissions.json` защищен через `.htaccess`
- `.env` файл добавлен в `.gitignore`

## Поддержка

По вопросам обращайтесь к документации Sprinthost или в техподдержку.
