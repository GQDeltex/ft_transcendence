export class Message {
  from: { id: number; username: string };
  to: { id?: number; name: string };
  msg: string;
}