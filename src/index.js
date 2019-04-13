import express from 'express';
import socket from 'socket.io';

const app = express();

app.use(express.static('public'));

const expressServer = app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000`)
);

const io = socket(expressServer);
io.on('connection', socket => {
  console.log('socket connected!', socket.id);

  socket.on('chat', data => {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', data => {
    socket.broadcast.emit('typing', data);
  });
});
