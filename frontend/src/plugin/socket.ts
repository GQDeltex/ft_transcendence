import { io, Socket } from 'socket.io-client';
import { useErrorStore } from '../store/error';

export const socket: Socket = io(`http://${import.meta.env.VITE_DOMAIN}:8080`, {
  autoConnect: false,
  withCredentials: true,
});

socket.on('connect', function () {
  socket.emit('newconnection', 'hello');
  console.log('Socket Connected', socket.id);
});

socket.on('exception', function (data) {
  console.log(`Exception on Socket(${socket.id}):`, data);
  const errorStore = useErrorStore();
  errorStore.setError(data.message);
});

socket.on('disconnect', function () {
  console.log('Socket Disconnected');
});
