# Лендинг ОРЁЛ

Full-stack лендинг для компании ОРЁЛ с интеграцией Telegram Bot для получения заявок.

## Технологии

**Frontend:**
- React
- Vite
- CSS3 с адаптивной версткой

**Backend:**
- Python 3.8+
- Flask
- Gunicorn (production server)

**Деплой:**
- Nginx (reverse proxy)
- Systemd (service management)
- Let's Encrypt (SSL/TLS)

## Возможности

- Адаптивный дизайн для всех устройств
- Форма обратной связи с валидацией
- Автоматическая отправка заявок в Telegram
- SSL сертификат для безопасности
- Логирование всех заявок

## Быстрый старт для разработки

```bash
# Установка зависимостей
pip install -r requirements.txt

# Запуск локально
python app.py
```

Приложение будет доступно на http://localhost:5000

## Деплой на продакшен

### Автоматический деплой на prodazhi-ai.ru

```bash
# На сервере выполните:
ssh root@your-server
curl -o deploy.sh https://raw.githubusercontent.com/ksosedov83-hub/orel-landing-final/claude/deploy-prodazhi-ai-012XETg36H314usqYTcXfQPn/deploy.sh
chmod +x deploy.sh
./deploy.sh
```

Подробные инструкции см. в [DEPLOYMENT.md](DEPLOYMENT.md)

## Структура проекта

```
orel-landing-final/
├── app.py                    # Flask приложение
├── static/                   # React frontend (собранный)
│   ├── index.html
│   └── assets/
├── requirements.txt          # Python зависимости
├── gunicorn_config.py       # Конфигурация Gunicorn
├── orel-landing.service     # Systemd service
├── nginx-prodazhi-ai.conf   # Nginx конфигурация
├── deploy.sh                # Скрипт деплоя
├── backup.sh                # Скрипт резервного копирования
├── submissions.json         # База данных заявок
└── DEPLOYMENT.md            # Подробная инструкция по деплою
```

## Конфигурация

Создайте файл `.env` на основе `.env.example`:

```bash
cp .env.example .env
```

Заполните значения:
- `TELEGRAM_BOT_TOKEN` - токен от @BotFather
- `TELEGRAM_CHAT_ID` - ваш chat_id от @userinfobot

## Управление на продакшене

```bash
# Перезапуск приложения
sudo systemctl restart orel-landing

# Просмотр логов
sudo journalctl -u orel-landing -f

# Обновление из git
cd /var/www/orel-landing
sudo git pull
sudo systemctl restart orel-landing
```

## Безопасность

- SSL/TLS сертификаты от Let's Encrypt
- CORS настроен для безопасности
- Логирование всех заявок
- Автоматическое резервное копирование

## Лицензия

Proprietary - Все права защищены

## Поддержка

При возникновении вопросов обращайтесь к документации в [DEPLOYMENT.md](DEPLOYMENT.md)
