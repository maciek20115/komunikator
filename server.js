const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./auth');
const chatRoutes = require('./chat');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api/chat', chatRoutes);
app.use(express.static('public'));

const users = new Map();

io.on('connection', socket => {
  console.log('Użytkownik połączony:', socket.id);

  socket.on('join', username => {
    users.set(socket.id, username);
    io.emit('user-list', Array.from(users.values()));
  });

  socket.on('message', ({ from, to, content }) => {
    io.emit('message', { from, to, content, timestamp: Date.now() });
  });

  socket.on('call-user', ({ to, offer }) => {
    socket.to(to).emit('call-made', { from: socket.id, offer });
  });

  socket.on('make-answer', ({ to, answer }) => {
    socket.to(to).emit('answer-made', { from: socket.id, answer });
  });

  socket.on('disconnect', () => {
    users.delete(socket.id);
    io.emit('user-list', Array.from(users.values()));
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));