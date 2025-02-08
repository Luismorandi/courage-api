import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from 'src/chat/domain/message.dto';
import { Message } from 'src/chat/domain/message';
import { MessageFactory } from 'src/chat/common/message.factory';
import { MessagePostgreRepository } from 'src/chat/infrastructure/postgre/message/message.repository';

@Injectable()
export class CreateMessageUseCase {
    private readonly messageFactory: MessageFactory = new MessageFactory();
    constructor(private readonly messageRepository: MessagePostgreRepository) {}

    async exec(input: CreateMessageInput): Promise<Message> {
        const newMessage = this.messageFactory.createMessage(input);
        await this.messageRepository.save(newMessage);
        return newMessage;
    }
}
