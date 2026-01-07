#!/bin/bash
# BLGPanel - Automated Installer for BLGTSC

echo "🚀 Incepe instalarea BLGPanel..."

# 1. Update si Instalare Dependinte
sudo apt update && sudo apt install -y nodejs npm nginx psmisc ufw git
sudo npm install -g pm2

# 2. Configurare folder proiect
cd /var/www/BLGPanel
npm install

# 3. Rezolvare erori si Build (Fix 500 Error)
# Ne asiguram ca portul 3001 e liber si deschis
sudo fuser -k 3001/tcp || true
sudo ufw allow 80/tcp
sudo ufw allow 3001/tcp
sudo ufw --force enable

# Generam fisierele de productie
npm run build

# 4. Pornire Backend
pm2 delete blg-backend || true
pm2 start server.cjs --name "blg-backend"
pm2 save

# 5. Configurare Nginx
sudo cat << 'EON' > /etc/nginx/sites-available/blgpanel
server {
    listen 80;
    server_name _;
    root /var/www/BLGPanel/dist;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EON

sudo ln -sf /etc/nginx/sites-available/blgpanel /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo systemctl restart nginx

echo "✅ Instalare finalizata! Acceseaza IP-ul tau."
