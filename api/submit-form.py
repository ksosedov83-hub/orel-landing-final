import os
import json
from datetime import datetime, timezone, timedelta
from http.server import BaseHTTPRequestHandler
import requests

TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN')
TELEGRAM_CHAT_ID = os.environ.get('TELEGRAM_CHAT_ID')


def send_telegram(name, phone, contact_method, timestamp):
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        return False
    try:
        message = (
            f"🔔 <b>Новая заявка с сайта ОРЁЛ!</b>\n\n"
            f"👤 <b>Имя:</b> {name}\n"
            f"📱 <b>Телефон:</b> {phone}\n"
            f"💬 <b>Способ связи:</b> {contact_method}\n"
            f"⏰ <b>Время:</b> {timestamp}"
        )
        res = requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage",
            json={"chat_id": TELEGRAM_CHAT_ID, "text": message, "parse_mode": "HTML"},
            timeout=10,
        )
        return res.status_code == 200
    except Exception as e:
        print(f"Telegram error: {e}")
        return False


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            data = json.loads(self.rfile.read(length).decode("utf-8"))

            name = data.get("name", "").strip()
            phone = data.get("phone", "").strip()
            contact_method = data.get("contactMethod") or data.get("contact_method", "не указан")

            if not name or not phone:
                self._respond(400, {"success": False, "message": "Имя и телефон обязательны"})
                return

            moscow_tz = timezone(timedelta(hours=3))
            ts = datetime.now(moscow_tz).strftime("%d.%m.%Y %H:%M:%S")

            ok = send_telegram(name, phone, contact_method, ts)
            if not ok:
                print(f"Telegram notification failed (lead received: {name})")

            self._respond(200, {"success": True, "message": "Заявка принята"})

        except Exception as e:
            print(f"Error: {e}")
            self._respond(500, {"success": False, "message": str(e)})

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors_headers()
        self.end_headers()

    def _respond(self, code, body):
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self._cors_headers()
        self.end_headers()
        self.wfile.write(json.dumps(body, ensure_ascii=False).encode())

    def _cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def log_message(self, format, *args):
        pass
