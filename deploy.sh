#!/bin/bash

echo "🚀 Q&A 系统快速部署脚本"
echo "=========================="

# 检查是否安装了必要工具
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 未安装"
        return 1
    else
        echo "✅ $1 已安装"
        return 0
    fi
}

echo "📋 检查环境..."
check_command "node" || exit 1
check_command "npm" || exit 1

echo ""
echo "🔧 选择部署方式："
echo "1. 本地测试 (ngrok)"
echo "2. Railway 云部署"
echo "3. 手动云服务器部署"

read -p "请选择 (1-3): " choice

case $choice in
    1)
        echo "🌐 启动本地服务并开启公网访问..."
        
        # 检查 ngrok
        if ! command -v ngrok &> /dev/null; then
            echo "📦 安装 ngrok..."
            if [[ "$OSTYPE" == "darwin"* ]]; then
                brew install ngrok
            else
                echo "请手动安装 ngrok: https://ngrok.com/download"
                exit 1
            fi
        fi
        
        # 启动服务
        echo "🚀 启动应用..."
        npm start &
        APP_PID=$!
        
        sleep 3
        
        # 启动 ngrok
        echo "🌍 开启公网隧道..."
        ngrok http 3000 &
        NGROK_PID=$!
        
        echo ""
        echo "✅ 部署完成！"
        echo "📱 访问 http://localhost:4040 查看公网地址"
        echo "🛑 按 Ctrl+C 停止服务"
        
        # 等待用户停止
        trap "kill $APP_PID $NGROK_PID; exit" INT
        wait
        ;;
        
    2)
        echo "☁️ Railway 部署指南："
        echo "1. 访问 https://railway.app"
        echo "2. 用 GitHub 登录"
        echo "3. 点击 'New Project' → 'Deploy from GitHub repo'"
        echo "4. 选择包含此项目的仓库"
        echo "5. Railway 会自动检测并部署"
        echo ""
        echo "📝 需要先将代码推送到 GitHub："
        echo "git init"
        echo "git add ."
        echo "git commit -m 'Initial commit'"
        echo "git remote add origin YOUR_GITHUB_REPO_URL"
        echo "git push -u origin main"
        ;;
        
    3)
        echo "🖥️ 云服务器部署步骤："
        echo "1. 购买云服务器 (阿里云/腾讯云/DigitalOcean)"
        echo "2. 安装 Node.js 和 PM2"
        echo "3. 上传代码到服务器"
        echo "4. 运行: npm install && pm2 start server.js"
        echo "5. 配置防火墙开放端口 3000"
        echo ""
        echo "📖 详细步骤请查看 deploy-cloud.md"
        ;;
        
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac