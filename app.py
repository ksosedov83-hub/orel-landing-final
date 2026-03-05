from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
from datetime import datetime, timezone, timedelta
import requests
import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, 'static')

app = Flask(__name__, static_folder=None)
CORS(app)

# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
TELEGRAM_CHAT_ID = os.getenv('TELEGRAM_CHAT_ID')

def send_telegram_message(text):
    """Send message to Telegram"""
    try:
        url = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage'
        data = {
            'chat_id': TELEGRAM_CHAT_ID,
            'text': text,
            'parse_mode': 'HTML'
        }
        response = requests.post(url, data=data)
        return response.json()
    except Exception as e:
        print(f"Error sending telegram message: {str(e)}")
        return None

@app.route('/api/submit-form', methods=['POST'])
def submit_form():
    try:
        data = request.get_json()
        
        # Log submission with Moscow timezone (UTC+3)
        moscow_tz = timezone(timedelta(hours=3))
        moscow_time = datetime.now(moscow_tz)
        
        submission = {
            'timestamp': moscow_time.isoformat(),
            'name': data.get('name'),
            'phone': data.get('phone'),
            'contactMethod': data.get('contactMethod')
        }
        
        # Save to file
        with open('submissions.json', 'a') as f:
            f.write(json.dumps(submission, ensure_ascii=False) + '\n')
        
        # Send to Telegram
        telegram_message = f"""
🔔 <b>Новая заявка с сайта ОРЁЛ!</b>

👤 <b>Имя:</b> {data.get('name')}
📱 <b>Телефон:</b> {data.get('phone')}
💬 <b>Предпочтительный способ связи:</b> {data.get('contactMethod')}

⏰ <b>Время:</b> {moscow_time.strftime('%d.%m.%Y %H:%M:%S')}
"""
        
        telegram_result = send_telegram_message(telegram_message)
        
        if telegram_result and telegram_result.get('ok'):
            print(f"✅ Lead sent to Telegram successfully: {submission}")
        else:
            print(f"⚠️ Telegram notification failed (lead saved): {telegram_result}")
        
        return jsonify({'success': True, 'message': 'Form submitted successfully'}), 200
            
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)

