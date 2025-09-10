# Q&A System - 实时问答系统

类似 Slido 的实时 Q&A 系统，支持演讲者创建会话，观众扫码提问，实时同步更新。

## 功能特性

- 🎤 **演讲者控制台**: 创建会话，实时查看问题
- 📱 **观众端**: 扫码或链接进入，匿名或实名提问
- 🔄 **实时同步**: WebSocket 实现实时更新
- 📊 **投票功能**: 观众可为问题投票，按热度排序
- 📱 **响应式设计**: 支持手机和桌面端
- 🎨 **现代UI**: 渐变色彩，流畅动画

## 技术栈

- **后端**: Node.js + Express + Socket.IO
- **前端**: 原生 HTML/CSS/JavaScript
- **实时通信**: WebSocket
- **二维码**: qrcode 库
- **会话管理**: 内存存储 (可扩展为数据库)

## 快速开始

### 1. 安装依赖
```bash
cd qa-system
npm install
```

### 2. 启动服务
```bash
npm start
# 或开发模式
npm run dev
```

### 3. 访问系统
- 演讲者端: http://localhost:3000
- 观众端: 扫描二维码或访问生成的链接

## 使用流程

### 演讲者操作
1. 访问首页，输入演讲标题
2. 创建会话，获得二维码和链接
3. 展示二维码给观众
4. 实时查看观众提问
5. 问题按投票数和时间排序

### 观众操作
1. 扫描二维码或访问链接
2. 输入姓名（可选）和问题
3. 提交问题
4. 查看其他问题并投票

## API 接口

### 创建会话
```
POST /api/sessions
Body: { "title": "演讲标题" }
Response: { "sessionId": "xxx", "qrCode": "data:image/png...", "audienceUrl": "http://..." }
```

### 获取会话信息
```
GET /api/sessions/:id
Response: { "id": "xxx", "title": "xxx", "questions": [...] }
```

### 提交问题
```
POST /api/sessions/:id/questions
Body: { "question": "问题内容", "author": "提问者" }
Response: { "id": "xxx", "text": "xxx", "author": "xxx", "timestamp": "xxx", "votes": 0 }
```

### 投票
```
POST /api/sessions/:id/questions/:questionId/vote
Response: { "id": "xxx", "votes": 1 }
```

## WebSocket 事件

- `joinPresenter(sessionId)`: 演讲者加入房间
- `joinAudience(sessionId)`: 观众加入房间
- `newQuestion(question)`: 新问题通知
- `questionUpdated(question)`: 问题更新通知

## 项目结构

```
qa-system/
├── server.js              # 服务器主文件
├── package.json           # 依赖配置
├── README.md             # 项目说明
└── public/               # 静态文件
    ├── presenter.html         # 演讲者首页
    ├── presenter-session.html # 演讲者会话页
    └── audience.html         # 观众提问页
```

## 扩展功能

可以考虑添加的功能：
- 数据库持久化 (MongoDB/PostgreSQL)
- 用户认证系统
- 问题审核功能
- 导出问题功能
- 多语言支持
- 问题分类标签
- 实时统计分析

## 部署建议

- 使用 PM2 进行进程管理
- 配置 Nginx 反向代理
- 使用 Redis 存储会话数据
- 配置 HTTPS 证书
- 设置环境变量管理配置