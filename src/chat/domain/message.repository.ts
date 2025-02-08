import { Message } from './message';

export interface IMessageRepository {
    save(message: Message): Promise<Message>;
    getMessages(receiverId: string, senderId: string): Promise<Message[]>;
}
