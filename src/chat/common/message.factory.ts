import { Injectable } from '@nestjs/common';
import { Message } from '../domain/message/message';
import { CreateMessageInput } from '../domain/message/message.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class MessageFactory {
    createMessage(input: CreateMessageInput): Message {
        return new Message(
            randomUUID(),
            input.senderId,
            input.receiverId,
            input.content,
            new Date(),
            'SENT',
        );
    }
}
