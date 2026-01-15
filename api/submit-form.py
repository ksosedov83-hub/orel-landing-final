import os
import json
from datetime import datetime
from http.server import BaseHTTPRequestHandler
import requests

# Получаем переменные окружения
TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN' )
TELEGRAM_CHAT_ID = os.environ.get('TELEGRAM_CHAT_ID')

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length)
        
        try:
            data = json.loads(body.decode('utf-8'))
            print(f"Received data: {data}") # Логируем входящие данные

            # Извлекаем данные (поддерживаем разные варианты написания ключей)
            name = data.get('name') or data.get('userName', 'N/A')
            phone = data.get('phone') or data.get('userPhone', 'N/A')
            contact_method = data.get('contact_method') or data.get('contactMethod', 'N/A')
            consent = data.get('consent', False)

            # Проверка обязательных полей
            if not name or not phone or name == 'N/A' or phone == 'N/A':
                self.send_error_response(400, "Имя и телефон обязательны")
                return

            # Проверка токенов
            if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
                print("ERROR: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing in Env Variables")
                self.send_error_response(500, "Ошибка конфигурации сервера (Env Vars)")
                return

            # Формируем сообщение
            timestamp = datetime.now().strftime('%d.%m.%Y %H:%M:%S')
            message = f"📋 <b>Новая заявка ОРЁЛ</b>\n\n👤 <b>Имя:</b> {name}\n📱 <b>Тел:</b> {phone}\n💬 <b>Связь:</b> {contact_method}\n⏰ <b>Время:</b> {timestamp}"

            # Отправка в Telegram
            telegram_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
            res = requests.post(telegram_url, json={
                'chat_id': TELEGRAM_CHAT_ID,
                'text': message,
                'parse_mode': 'HTML'
            }, timeout=10 )

            print(f"Telegram API Response: {res.text}") # Видим ответ от Telegram в логах!

            if res.status_code == 200:
                self.send_success_response("Заявка успешно отправлена")
            else:
                self.send_error_response(500, f"Ошибка Telegram API: {res.status_code}")

        except Exception as e:
            print(f"Critical Error: {str(e)}")
            self.send_error_response(500, str(e))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def send_success_response(self, message):
        self.send_response(200)
        self.send_common_headers()
        self.wfile.write(json.dumps({'success': True, 'message': message}).encode())

    def send_error_response(self, code, message):
        self.send_response(code)
        self.send_common_headers()
        self.wfile.write(json.dumps({'success': False, 'message': message}).encode())

    def send_common_headers(self):
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
