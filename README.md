# ОРЁЛ - ИИ-ассистент для анализа звонков отдела продаж

Лендинг-страница для продукта ОРЁЛ - системы анализа звонков с помощью искусственного интеллекта.

## Технологии

- **Backend:** Flask (Python 3.11+)
- **Frontend:** React (собранная версия)
- **Интеграция:** Telegram Bot API

## Структура проекта

```
orel-landing-final/
├── app.py                      # Flask сервер
├── requirements.txt            # Python зависимости
├── .env.example               # Пример переменных окружения
├── .gitignore                 # Игнорируемые файлы
├── submissions.json           # Файл с заявками (создается автоматически)
└── static/                    # Frontend (собранный React)
    ├── index.html
    ├── favicon.ico
    └── assets/
        ├── index--FatDy-l.js
        ├── index-sdxN_hoF.css
        ├── kirill-portrait-new-1EeHvmEn.jpg
        └── logo_oryol_final_corrected-B-yxFobh.png
```

## Требования

- Python 3.11 или выше
- pip (установщик пакетов Python)

## Установка и запуск

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd orel-landing-final
```

### 2. Создание виртуального окружения (рекомендуется)

```bash
# Создание виртуального окружения
python3 -m venv venv

# Активация виртуального окружения
# На macOS/Linux:
source venv/bin/activate

# На Windows:
venv\Scripts\activate
```

### 3. Установка зависимостей

```bash
pip install -r requirements.txt
```

### 4. Настройка переменных окружения

```bash
# Создайте файл .env на основе примера
cp .env.example .env

# Отредактируйте .env и укажите ваши данные:
# TELEGRAM_BOT_TOKEN=ваш_токен_бота
# TELEGRAM_CHAT_ID=ваш_chat_id
```

**Как получить токен Telegram бота:**

1. Найдите [@BotFather](https://t.me/botfather) в Telegram
2. Отправьте команду `/newbot`
3. Следуйте инструкциям для создания бота
4. Скопируйте полученный токен

**Как получить Chat ID:**

1. Найдите [@userinfobot](https://t.me/userinfobot) в Telegram
2. Отправьте боту любое сообщение
3. Скопируйте ваш Chat ID

### 5. Запуск приложения

```bash
python3 app.py
```

Приложение запустится на `http://localhost:5000`

## API Endpoints

### POST /api/submit-form
Отправка формы с заявкой

**Request Body:**
```json
{
  "name": "Имя",
  "phone": "+7 (999) 123-45-67",
  "contactMethod": "Telegram"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Form submitted successfully"
}
```

### GET /health
Проверка статуса сервера

**Response:**
```json
{
  "status": "ok"
}
```

## Функции

- Лендинг-страница с информацией о продукте
- Форма обратной связи
- Автоматическая отправка заявок в Telegram
- Сохранение заявок в JSON файл
- Временная метка в московском часовом поясе (UTC+3)

## Разработка

### Структура backend

- `app.py` - основной файл Flask приложения
- `/api/submit-form` - endpoint для обработки форм
- `/health` - endpoint для проверки здоровья приложения
- Все остальные маршруты отдают React приложение

### Логирование

Все заявки сохраняются в файл `submissions.json` в формате:

```json
{"timestamp": "2025-11-21T10:30:00+03:00", "name": "Имя", "phone": "+7...", "contactMethod": "Telegram"}
```

## Production Deploy

Для production развертывания рекомендуется:

1. Использовать production WSGI сервер (Gunicorn, uWSGI)
2. Настроить reverse proxy (Nginx)
3. Использовать HTTPS
4. Настроить логирование
5. Использовать базу данных вместо JSON файла

Пример запуска с Gunicorn:

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## Безопасность

- Telegram токены хранятся в `.env` файле (не коммитятся в git)
- CORS настроен для приема запросов
- Валидация входящих данных

## Лицензия

Proprietary
