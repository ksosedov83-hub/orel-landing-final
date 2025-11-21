#!/bin/bash

# Deployment script for Orel Landing on prodazhi-ai.ru
# This script should be run on the production server

set -e

echo "🚀 Starting deployment for Orel Landing on prodazhi-ai.ru"

# Configuration
APP_DIR="/var/www/orel-landing"
APP_USER="www-data"
APP_GROUP="www-data"
VENV_DIR="$APP_DIR/venv"
LOG_DIR="/var/log/orel-landing"
RUN_DIR="/var/run/orel-landing"
REPO_URL="https://github.com/ksosedov83-hub/orel-landing-final.git"
BRANCH="claude/deploy-prodazhi-ai-012XETg36H314usqYTcXfQPn"

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Please run as root"
    exit 1
fi

echo "📦 Installing system dependencies..."
apt-get update
apt-get install -y python3 python3-pip python3-venv nginx certbot python3-certbot-nginx git

echo "📁 Creating application directory..."
mkdir -p $APP_DIR
mkdir -p $LOG_DIR
mkdir -p $RUN_DIR

echo "🔽 Cloning repository..."
if [ -d "$APP_DIR/.git" ]; then
    echo "Repository already exists, pulling latest changes..."
    cd $APP_DIR
    git pull origin $BRANCH
else
    git clone -b $BRANCH $REPO_URL $APP_DIR
    cd $APP_DIR
fi

echo "🐍 Setting up Python virtual environment..."
python3 -m venv $VENV_DIR
source $VENV_DIR/bin/activate

echo "📚 Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "🔐 Setting up permissions..."
chown -R $APP_USER:$APP_GROUP $APP_DIR
chown -R $APP_USER:$APP_GROUP $LOG_DIR
chown -R $APP_USER:$APP_GROUP $RUN_DIR
chmod 755 $APP_DIR

echo "⚙️ Configuring systemd service..."
cp orel-landing.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable orel-landing
systemctl restart orel-landing

echo "🌐 Configuring nginx..."
cp nginx-prodazhi-ai.conf /etc/nginx/sites-available/prodazhi-ai.ru
ln -sf /etc/nginx/sites-available/prodazhi-ai.ru /etc/nginx/sites-enabled/

# Remove default nginx site if it exists
rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
nginx -t

echo "🔒 Setting up SSL certificate..."
echo "⚠️  Please ensure your domain prodazhi-ai.ru points to this server's IP address"
read -p "Press enter to continue with SSL setup or Ctrl+C to cancel..."

certbot --nginx -d prodazhi-ai.ru -d www.prodazhi-ai.ru --non-interactive --agree-tos --email admin@prodazhi-ai.ru || {
    echo "⚠️  SSL setup failed. You can run this manually later:"
    echo "certbot --nginx -d prodazhi-ai.ru -d www.prodazhi-ai.ru"
}

echo "♻️ Reloading nginx..."
systemctl reload nginx

echo "✅ Deployment completed!"
echo ""
echo "📊 Service status:"
systemctl status orel-landing --no-pager

echo ""
echo "🔍 Useful commands:"
echo "  - View application logs: journalctl -u orel-landing -f"
echo "  - View nginx logs: tail -f /var/log/nginx/prodazhi-ai.ru-error.log"
echo "  - Restart application: systemctl restart orel-landing"
echo "  - Reload nginx: systemctl reload nginx"
echo ""
echo "🌐 Your site should now be available at: https://prodazhi-ai.ru"
