"""
Vercel Serverless Function for ОРЁЛ Landing Form Submission
Handles form submissions and sends data to Telegram
"""

import os
import json
from datetime import datetime
from http.server import BaseHTTPRequestHandler
import requests

# Get environment variables
TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN')
TELEGRAM_CHAT_ID = os.environ.get('TELEGRAM_CHAT_ID')

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """Handle POST requests from the form"""
        
        # Enable CORS
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        try:
            # Read request body
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            data = json.loads(body.decode('utf-8'))
            
            # Extract form data
            name = data.get('name', 'N/A')
            phone = data.get('phone', 'N/A')
            contact_method = data.get('contact_method', 'N/A')
            consent = data.get('consent', False)
            
            # Validate required fields
            if not name or not phone:
                self.wfile.write(json.dumps({
                    'success': False,
                    'message': 'Имя и телефон обязательны'
                }).encode())
                return
            
            # Check consent
            if not consent:
                self.wfile.write(json.dumps({
                    'success': False,
                    'message': 'Необходимо согласие на обработку данных'
                }).encode())
                return
            
            # Check Telegram credentials
            if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
                print("ERROR: Telegram credentials not configured")
                self.wfile.write(json.dumps({
                    'success': False,
                    'message': 'Ошибка конфигурации сервера'
                }).encode())
                return
            
            # Format message for Telegram
            timestamp = datetime.now().strftime('%d.%m.%Y %H:%M:%S')
            message = f"""
📋 <b>Новая заявка с сайта ОРЁЛ</b>

👤 <b>Имя:</b> {name}
📱 <b>Телефон:</b> {phone}
💬 <b>Способ связи:</b> {contact_method}
✅ <b>Согласие 152-ФЗ:</b> Да
⏰ <b>Время:</b> {timestamp}
            """.strip()
            
            # Send to Telegram
            telegram_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
            telegram_data = {
                'chat_id': TELEGRAM_CHAT_ID,
                'text': message,
                'parse_mode': 'HTML'
            }
            
            response = requests.post(telegram_url, json=telegram_data, timeout=10)
            
            if response.status_code == 200:
                self.wfile.write(json.dumps({
                    'success': True,
                    'message': 'Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.'
                }).encode())
            else:
                print(f"Telegram error: {response.text}")
                self.wfile.write(json.dumps({
                    'success': False,
                    'message': 'Ошибка при отправке заявки'
                }).encode())
                
        except json.JSONDecodeError:
            self.wfile.write(json.dumps({
                'success': False,
                'message': 'Ошибка обработки данных'
            }).encode())
        except Exception as e:
            print(f"Error: {str(e)}")
            self.wfile.write(json.dumps({
                'success': False,
                'message': 'Внутренняя ошибка сервера'
            }).encode())
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
