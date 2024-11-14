const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

let channels = {}; // Store messages for each channel

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('create_channel', (channelName) => {
    if (!channels[channelName]) {
      channels[channelName] = [];
      io.emit('channel_list', Object.keys(channels));
    }
  });

  socket.on('join_channel', (channelName) => {
    socket.join(channelName);
    socket.emit('message_history', channels[channelName]);
  });

  socket.on('send_message', ({ channelName, message }) => {
    const msg = { userId: socket.id, message };
    channels[channelName].push(msg);
    io.to(channelName).emit('receive_message', msg);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
