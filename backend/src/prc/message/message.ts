export class Message {
  from: { id: number; name: string };
  to: { id?: number; name: string };
  msg: string;
}
