# 本地部署到公网

## 方法1: 使用 ngrok (推荐临时测试)

### 1. 安装 ngrok
```bash
# macOS
brew install ngrok

# Windows - 下载 https://ngrok.com/download
# Linux
wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
```

### 2. 启动应用
```bash
cd qa-system
npm start
```

### 3. 开启公网访问
```bash
# 新开终端窗口
ngrok http 3000
```

### 4. 获取公网地址
ngrok 会显示类似：
```
Forwarding  https://abc123.ngrok.io -> http://localhost:3000
```

大家就可以通过 `https://abc123.ngrok.io` 访问了！

## 方法2: 使用 localtunnel

### 1. 安装
```bash
npm install -g localtunnel
```

### 2. 启动应用后开启隧道
```bash
lt --port 3000 --subdomain myqa
```

访问地址：`https://myqa.loca.lt`

## 方法3: 使用 serveo (无需安装)

```bash
ssh -R 80:localhost:3000 serveo.net
```

## 注意事项

- ngrok 免费版有连接数限制
- 重启后域名会变化
- 仅适合临时测试使用
- 生产环境建议使用云服务器