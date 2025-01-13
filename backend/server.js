const http = require('http');
const cors = require('cors');
const express = require('express');
const { Server } = require('socket.io');
const { consumeMessages } = require('./consumer');
const { sendMessage } = require('./producer');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow requests from the frontend
    methods: ['GET', 'POST'],
  },
});

// Use CORS middleware for the REST API
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow frontend origin
  })
);
app.use(express.json());

// API Endpoint to produce tasks
app.post('/tasks', async (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task is required' }); // Validate input
  }

  await sendMessage(task); // Send task to queue
  res.json({ message: `Task "${task}" queued.` });
});

// Socket.io for real-time updates
io.on('connection', (socket) => {
  console.log('Frontend connected');

  consumeMessages((message) => {
    socket.emit('taskCompleted', message); // Emit message to frontend
  });

  socket.on('disconnect', () => {
    console.log('Frontend disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
