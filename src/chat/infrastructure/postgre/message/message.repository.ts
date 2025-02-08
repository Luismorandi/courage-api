import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './message.entity';
import { IMessageRepository } from 'src/chat/domain/message.repository';
import { Message } from 'src/chat/domain/message';
import { MessageMapper } from './message.mapper';

@Injectable()
export class MessagePostgreRepository implements IMessageRepository {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>,

        private readonly messageMapper: MessageMapper,
    ) {}

    async save(message: Message): Promise<Message> {
        try {
            const messageEntity = this.messageMapper.toEntity(message);
            await this.messageRepository.save(messageEntity);

            return message;
        } catch (err) {
            throw new Error(`Failed to save message: ${(err as Error).message}`);
        }
    }

    async getMessages(receiverId: string, senderId: string): Promise<Message[]> {
        try {
            const messages = await this.messageRepository.find({
                where: [
                    { receiver_id: receiverId, sender_id: senderId },
                    { receiver_id: senderId, sender_id: receiverId },
                ],
                order: { created_at: 'DESC' },
            });

            return messages.map((messageEntity) =>
                this.messageMapper.toDomain(messageEntity),
            );
        } catch (err) {
            throw new Error(`Failed to get messages: ${(err as Error).message}`);
        }
    }
}
