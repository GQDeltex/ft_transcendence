import { io, Socket } from 'socket.io-client';
import { useErrorStore } from '../store/error';

const errorStore = useErrorStore();

export const socket: Socket = io(`http://${import.meta.env.VITE_DOMAIN}:8080`, {
  withCredentials: true,
});

socket.on('connect', function () {
  socket.emit('newconnection', 'hello');
  console.log('Connected');
});

socket.on('exception', function (data) {
  console.log('exception: ', data);
  errorStore.setError(data.message);
});

socket.on('disconnect', function () {
  console.log('Disconnected');
});
