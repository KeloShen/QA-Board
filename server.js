const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  transports: ['websocket', 'polling']
});

app.use(express.static('public'));
app.use(express.json());

// 存储会话数据
const sessions = new Map();

// 创建新会话
app.post('/api/sessions', async (req, res) => {
  const sessionId = uuidv4().substring(0, 8);
  const session = {
    id: sessionId,
    title: req.body.title || 'Q&A Session',
    questions: [],
    createdAt: new Date()
  };
  
  sessions.set(sessionId, session);
  
  // 生成二维码
  const qrUrl = `${req.protocol}://${req.get('host')}/audience/${sessionId}`;
  const qrCode = await QRCode.toDataURL(qrUrl);
  
  res.json({
    sessionId,
    qrCode,
    audienceUrl: qrUrl
  });
});

// 获取会话信息
app.get('/api/sessions/:id', (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  res.json(session);
});

// 生成会话二维码
app.get('/api/sessions/:id/qr', async (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  const audienceUrl = `${req.protocol}://${req.get('host')}/audience/${req.params.id}`;
  const qrCode = await QRCode.toDataURL(audienceUrl);
  
  res.json({
    qrCode,
    audienceUrl
  });
});

// 提交问题
app.post('/api/sessions/:id/questions', (req, res) => {
  const sessionId = req.params.id;
  const session = sessions.get(sessionId);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  const question = {
    id: uuidv4(),
    text: req.body.question,
    author: req.body.author || 'Anonymous',
    timestamp: new Date(),
    votes: 0
  };
  
  session.questions.push(question);
  
  console.log(`📝 New question in session ${sessionId}:`, question.text);
  console.log(`📡 Broadcasting to presenter-${sessionId}`);
  
  // 实时通知演讲者和观众
  io.to(`presenter-${sessionId}`).emit('newQuestion', question);
  io.to(`audience-${sessionId}`).emit('newQuestion', question);
  
  res.json(question);
});

// 投票
app.post('/api/sessions/:id/questions/:questionId/vote', (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  const question = session.questions.find(q => q.id === req.params.questionId);
  if (!question) {
    return res.status(404).json({ error: 'Question not found' });
  }
  
  question.votes += 1;
  
  // 实时更新
  io.to(`presenter-${req.params.id}`).emit('questionUpdated', question);
  io.to(`audience-${req.params.id}`).emit('questionUpdated', question);
  
  res.json(question);
});

// Socket.IO 连接处理
io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);
  
  // 演讲者加入房间
  socket.on('joinPresenter', (sessionId) => {
    socket.join(`presenter-${sessionId}`);
    console.log(`🎤 Presenter joined session: ${sessionId} (socket: ${socket.id})`);
    
    // 确认加入成功
    socket.emit('joinedRoom', { role: 'presenter', sessionId });
  });
  
  // 观众加入房间
  socket.on('joinAudience', (sessionId) => {
    socket.join(`audience-${sessionId}`);
    console.log(`👥 Audience joined session: ${sessionId} (socket: ${socket.id})`);
    
    // 确认加入成功
    socket.emit('joinedRoom', { role: 'audience', sessionId });
  });
  
  // 测试连接
  socket.on('ping', (data) => {
    console.log('🏓 Ping received:', data);
    socket.emit('pong', { message: 'Connection OK', timestamp: new Date() });
  });
  
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

// 路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'presenter.html'));
});

app.get('/presenter/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'presenter-session.html'));
});

app.get('/audience/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'audience.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Local: http://localhost:${PORT}`);
  if (process.env.RAILWAY_STATIC_URL) {
    console.log(`Production: ${process.env.RAILWAY_STATIC_URL}`);
  }
});