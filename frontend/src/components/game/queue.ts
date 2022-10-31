import { socket } from '../../service/socket';

export class Queue {
  public join_queue() {
    socket.emit('queue', { event: 'JOIN' });
  }

  public remoteScore = 0;
  public playerScore = 0;
}

export default new Queue();
