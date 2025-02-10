import { Injectable } from '@nestjs/common';
import { MessageEntity } from './message.entity';
import { Message } from 'src/chat/domain/message/message';
import { randomUUID } from 'crypto';

@Injectable()
export class MessageMapper {
    toEntity(message: Message): MessageEntity {
        return {
            id: message.getId() ?? randomUUID(),
            sender_id: message.getSenderId(),
            receiver_id: message.getReceiverId(),
            content: message.getContent(),
            created_at: message.getCreatedAt(),
            status: message.getStatus(),
        };
    }

    toDomain(message: MessageEntity): Message {
        return new Message(
            message.id,
            message.sender_id,
            message.receiver_id,
            message.content,
            message.created_at,
            message.status,
        );
    }
}
