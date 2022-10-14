import { io, Socket } from 'socket.io-client';

export const socket: Socket = io(`http://${import.meta.env.VITE_DOMAIN}:8080`, {
  withCredentials: true,
});

socket.on('connect', function () {
  socket.emit('newconnection', 'hello');
  console.log('Connected');
});

socket.on('exception', function (data) {
  console.log('exception: ', data);
});

socket.on('disconnect', function () {
  console.log('Disconnected');
});
