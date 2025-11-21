# Инструкция по развертыванию на prodazhi-ai.ru

Это руководство описывает шаги по развертыванию лендинга ОРЁЛ на сервере с доменом prodazhi-ai.ru.

## Требования к серверу

- **ОС**: Ubuntu 20.04/22.04 или Debian 11/12
- **RAM**: Минимум 1GB
- **CPU**: 1 ядро (рекомендуется 2)
- **Место на диске**: 5GB
- **Python**: 3.8+
- **Доступ**: root или sudo

## Предварительная настройка DNS

Перед началом развертывания убедитесь, что DNS настроен правильно:

1. Добавьте A-запись для `prodazhi-ai.ru` → IP адрес вашего сервера
2. Добавьте A-запись для `www.prodazhi-ai.ru` → IP адрес вашего сервера
3. Подождите несколько минут для распространения DNS

Проверить можно командой:
```bash
dig prodazhi-ai.ru
dig www.prodazhi-ai.ru
```

## Автоматическое развертывание

### Вариант 1: Быстрое развертывание (рекомендуется)

Выполните на сервере:

```bash
# Подключитесь к серверу по SSH
ssh root@ваш-сервер-ip

# Скачайте и запустите скрипт развертывания
curl -o deploy.sh https://raw.githubusercontent.com/ksosedov83-hub/orel-landing-final/claude/deploy-prodazhi-ai-012XETg36H314usqYTcXfQPn/deploy.sh
chmod +x deploy.sh
sudo ./deploy.sh
```

Скрипт автоматически выполнит все необходимые шаги.

## Ручное развертывание

### Шаг 1: Установка системных зависимостей

```bash
sudo apt-get update
sudo apt-get install -y python3 python3-pip python3-venv nginx certbot python3-certbot-nginx git
```

### Шаг 2: Клонирование репозитория

```bash
sudo mkdir -p /var/www/orel-landing
cd /var/www
sudo git clone -b claude/deploy-prodazhi-ai-012XETg36H314usqYTcXfQPn https://github.com/ksosedov83-hub/orel-landing-final.git orel-landing
cd orel-landing
```

### Шаг 3: Настройка Python окружения

```bash
sudo python3 -m venv venv
sudo venv/bin/pip install --upgrade pip
sudo venv/bin/pip install -r requirements.txt
```

### Шаг 4: Создание необходимых директорий

```bash
sudo mkdir -p /var/log/orel-landing
sudo mkdir -p /var/run/orel-landing
```

### Шаг 5: Настройка прав доступа

```bash
sudo chown -R www-data:www-data /var/www/orel-landing
sudo chown -R www-data:www-data /var/log/orel-landing
sudo chown -R www-data:www-data /var/run/orel-landing
```

### Шаг 6: Настройка systemd service

```bash
sudo cp /var/www/orel-landing/orel-landing.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable orel-landing
sudo systemctl start orel-landing
```

Проверьте статус:
```bash
sudo systemctl status orel-landing
```

### Шаг 7: Настройка Nginx

```bash
sudo cp /var/www/orel-landing/nginx-prodazhi-ai.conf /etc/nginx/sites-available/prodazhi-ai.ru
sudo ln -s /etc/nginx/sites-available/prodazhi-ai.ru /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default  # Удалить стандартный сайт
```

Проверьте конфигурацию:
```bash
sudo nginx -t
```

### Шаг 8: Настройка SSL сертификата (Let's Encrypt)

```bash
sudo certbot --nginx -d prodazhi-ai.ru -d www.prodazhi-ai.ru
```

Следуйте инструкциям certbot. Введите email для уведомлений и согласитесь с условиями.

### Шаг 9: Перезагрузка Nginx

```bash
sudo systemctl reload nginx
```

## Проверка работы

1. Откройте браузер и перейдите на https://prodazhi-ai.ru
2. Проверьте работу формы обратной связи
3. Убедитесь, что SSL сертификат установлен корректно

## Мониторинг и логи

### Просмотр логов приложения

```bash
# Логи Flask приложения (systemd)
sudo journalctl -u orel-landing -f

# Логи Gunicorn
sudo tail -f /var/log/orel-landing/error.log
sudo tail -f /var/log/orel-landing/access.log
```

### Просмотр логов Nginx

```bash
sudo tail -f /var/log/nginx/prodazhi-ai.ru-access.log
sudo tail -f /var/log/nginx/prodazhi-ai.ru-error.log
```

## Управление сервисом

```bash
# Запуск
sudo systemctl start orel-landing

# Остановка
sudo systemctl stop orel-landing

# Перезапуск
sudo systemctl restart orel-landing

# Статус
sudo systemctl status orel-landing

# Автозапуск при загрузке
sudo systemctl enable orel-landing
```

## Обновление приложения

```bash
cd /var/www/orel-landing
sudo git pull origin claude/deploy-prodazhi-ai-012XETg36H314usqYTcXfQPn
sudo venv/bin/pip install -r requirements.txt
sudo systemctl restart orel-landing
```

## Устранение неполадок

### Приложение не запускается

```bash
# Проверьте логи systemd
sudo journalctl -u orel-landing -n 50

# Проверьте права доступа
sudo chown -R www-data:www-data /var/www/orel-landing

# Проверьте виртуальное окружение
sudo /var/www/orel-landing/venv/bin/pip list
```

### Ошибки Nginx

```bash
# Проверьте синтаксис конфигурации
sudo nginx -t

# Проверьте, что порты не заняты
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443

# Перезапустите Nginx
sudo systemctl restart nginx
```

### SSL сертификат не работает

```bash
# Повторите настройку SSL
sudo certbot --nginx -d prodazhi-ai.ru -d www.prodazhi-ai.ru

# Проверьте срок действия сертификата
sudo certbot certificates

# Обновите сертификат вручную
sudo certbot renew
```

### Telegram уведомления не приходят

Проверьте правильность:
- TELEGRAM_BOT_TOKEN в файле `app.py:12`
- TELEGRAM_CHAT_ID в файле `app.py:13`

Токен можно получить у [@BotFather](https://t.me/BotFather), а chat_id у [@userinfobot](https://t.me/userinfobot)

## Безопасность

### Рекомендации:

1. **Не храните токены в открытом виде**
   ```bash
   # Создайте файл .env (добавлен в .gitignore)
   sudo nano /var/www/orel-landing/.env
   ```

   Содержимое:
   ```
   TELEGRAM_BOT_TOKEN=your_token_here
   TELEGRAM_CHAT_ID=your_chat_id_here
   ```

2. **Настройте firewall**
   ```bash
   sudo ufw allow 22/tcp   # SSH
   sudo ufw allow 80/tcp   # HTTP
   sudo ufw allow 443/tcp  # HTTPS
   sudo ufw enable
   ```

3. **Регулярно обновляйте систему**
   ```bash
   sudo apt-get update && sudo apt-get upgrade -y
   ```

## Архитектура

```
Internet → Nginx (port 443) → Gunicorn (port 5000) → Flask App
                ↓
         Static Files (React)
                ↓
         API endpoints
                ↓
         Telegram Bot API
```

## Контакты и поддержка

При возникновении проблем проверьте:
- Логи systemd: `journalctl -u orel-landing`
- Логи Nginx: `/var/log/nginx/`
- Логи приложения: `/var/log/orel-landing/`

## Резервное копирование

Рекомендуется создать скрипт для регулярного резервного копирования:

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backup/orel-landing"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Бэкап кода
tar -czf $BACKUP_DIR/code_$DATE.tar.gz /var/www/orel-landing

# Бэкап данных заявок
cp /var/www/orel-landing/submissions.json $BACKUP_DIR/submissions_$DATE.json

# Удалить старые бэкапы (старше 30 дней)
find $BACKUP_DIR -mtime +30 -delete

echo "Backup completed: $DATE"
```

Добавьте в crontab для автоматического выполнения:
```bash
sudo crontab -e
# Добавьте строку для ежедневного бэкапа в 3 часа ночи:
0 3 * * * /var/www/orel-landing/backup.sh
```
