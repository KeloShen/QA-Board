# 云服务器部署指南

## 推荐云平台

### 1. 阿里云/腾讯云 (国内)
- 学生机：约 10元/月
- 轻量应用服务器：约 24元/月

### 2. 海外平台
- **DigitalOcean**: $5/月
- **Vultr**: $2.5/月  
- **Linode**: $5/月

## 部署步骤

### 1. 购买服务器
- 选择 Ubuntu 20.04 LTS
- 最低配置：1核1G内存

### 2. 连接服务器
```bash
ssh root@your-server-ip
```

### 3. 安装环境
```bash
# 更新系统
apt update && apt upgrade -y

# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# 安装 PM2 (进程管理)
npm install -g pm2

# 安装 Nginx (可选)
apt install nginx -y
```

### 4. 上传代码
```bash
# 方法1: 使用 git
git clone your-repo-url
cd qa-system
npm install

# 方法2: 使用 scp 上传
scp -r qa-system/ root@your-server-ip:/root/
```

### 5. 启动应用
```bash
# 使用 PM2 启动
pm2 start server.js --name "qa-system"
pm2 startup
pm2 save

# 检查状态
pm2 status
```

### 6. 配置防火墙
```bash
# 开放端口
ufw allow 22    # SSH
ufw allow 80    # HTTP
ufw allow 443   # HTTPS
ufw allow 3000  # 应用端口
ufw enable
```

### 7. 配置域名 (可选)
- 购买域名
- 添加 A 记录指向服务器 IP
- 配置 Nginx 反向代理

## Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## SSL 证书 (HTTPS)
```bash
# 安装 Certbot
apt install certbot python3-certbot-nginx -y

# 获取证书
certbot --nginx -d your-domain.com

# 自动续期
crontab -e
# 添加: 0 12 * * * /usr/bin/certbot renew --quiet
```