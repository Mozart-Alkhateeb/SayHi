export interface IMessage {
  sender: string;
  receiver: string;
  message: string;
  date: Date;
  me: boolean;
}
