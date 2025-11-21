# Быстрый старт для Sprinthost

## Краткая инструкция развертывания

### 1. Подключение по SSH

```bash
ssh USERNAME@orel-ai.ru
```

### 2. Переход в директорию домена

```bash
cd ~/domains/orel-ai.ru/
```

### 3. Загрузка файлов

**Вариант A: Через Git**
```bash
git clone https://github.com/ksosedov83-hub/orel-landing-final.git .
```

**Вариант B: Через SCP (с локальной машины)**
```bash
scp -r /путь/к/проекту/* USERNAME@orel-ai.ru:~/domains/orel-ai.ru/
```

### 4. Запуск скрипта развертывания

```bash
cd ~/domains/orel-ai.ru/
bash deploy.sh
```

Скрипт автоматически:
- Создаст виртуальное окружение
- Установит все зависимости
- Настроит права доступа
- Покажет ваше имя пользователя и пути

### 5. Ручная настройка конфигурации

#### Редактирование .htaccess

```bash
nano .htaccess
```

Замените `USERNAME` на ваше имя пользователя (скрипт покажет его):

```apache
PassengerAppRoot /home/ВАШ_USER/domains/orel-ai.ru
PassengerPython /home/ВАШ_USER/domains/orel-ai.ru/venv/bin/python3
```

Сохранить: `Ctrl+O`, `Enter`, `Ctrl+X`

#### Редактирование passenger_wsgi.py

```bash
nano passenger_wsgi.py
```

Замените путь:

```python
INTERP = os.path.expanduser("/home/ВАШ_USER/domains/orel-ai.ru/venv/bin/python3")
```

Сохранить: `Ctrl+O`, `Enter`, `Ctrl+X`

### 6. Перезапуск приложения

```bash
touch tmp/restart.txt
```

### 7. Проверка работы

Откройте в браузере:
- Сайт: http://orel-ai.ru
- API Health: http://orel-ai.ru/health

## Команды для управления

```bash
# Перезапуск приложения
touch tmp/restart.txt

# Просмотр логов
tail -f ~/logs/error.log
tail -f ~/logs/access.log

# Проверка процессов Python
ps aux | grep python

# Проверка виртуального окружения
source venv/bin/activate
pip list
```

## Обновление кода

```bash
cd ~/domains/orel-ai.ru/
git pull origin main
source venv/bin/activate
pip install -r requirements.txt
touch tmp/restart.txt
```

## Решение проблем

### Ошибка 500
```bash
tail -50 ~/logs/error.log
```

### Приложение не стартует
```bash
source venv/bin/activate
python app.py  # Проверит синтаксис
```

### Права доступа
```bash
chmod -R 755 ~/domains/orel-ai.ru/
chmod 666 ~/domains/orel-ai.ru/submissions.json
```

## Полная документация

См. файл `DEPLOY_SPRINTHOST.md` для подробной инструкции.
