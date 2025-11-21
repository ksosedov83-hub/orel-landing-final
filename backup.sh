#!/bin/bash

# Backup script for Orel Landing
# Add to crontab: 0 3 * * * /var/www/orel-landing/backup.sh

BACKUP_DIR="/backup/orel-landing"
APP_DIR="/var/www/orel-landing"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

echo "🔄 Starting backup process..."

# Backup application code
echo "📦 Backing up application code..."
tar -czf $BACKUP_DIR/code_$DATE.tar.gz \
    --exclude='venv' \
    --exclude='__pycache__' \
    --exclude='*.pyc' \
    --exclude='.git' \
    $APP_DIR

# Backup submissions data
echo "📊 Backing up submissions data..."
if [ -f "$APP_DIR/submissions.json" ]; then
    cp $APP_DIR/submissions.json $BACKUP_DIR/submissions_$DATE.json
else
    echo "⚠️  No submissions.json found"
fi

# Backup nginx config
echo "⚙️  Backing up nginx configuration..."
if [ -f "/etc/nginx/sites-available/prodazhi-ai.ru" ]; then
    cp /etc/nginx/sites-available/prodazhi-ai.ru $BACKUP_DIR/nginx_$DATE.conf
fi

# Backup systemd service
echo "⚙️  Backing up systemd service..."
if [ -f "/etc/systemd/system/orel-landing.service" ]; then
    cp /etc/systemd/system/orel-landing.service $BACKUP_DIR/systemd_$DATE.service
fi

# Remove old backups (older than 30 days)
echo "🧹 Cleaning up old backups..."
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
find $BACKUP_DIR -name "submissions_*.json" -mtime +30 -delete
find $BACKUP_DIR -name "nginx_*.conf" -mtime +30 -delete
find $BACKUP_DIR -name "systemd_*.service" -mtime +30 -delete

echo "✅ Backup completed: $DATE"
echo "📁 Backup location: $BACKUP_DIR"

# List recent backups
echo ""
echo "📋 Recent backups:"
ls -lht $BACKUP_DIR | head -10
