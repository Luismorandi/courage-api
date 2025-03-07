import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageInput } from 'src/chat/domain/message/message.dto';
import { Message } from 'src/chat/domain/message/message';
import { MessageFactory } from 'src/chat/common/message.factory';
import { IMessageRepository } from 'src/chat/domain/message/message.repository';
import { EnumChatRepository } from 'src/chat/domain/chat.enum';

@Injectable()
export class CreateMessageUseCase {
    private readonly messageFactory: MessageFactory = new MessageFactory();
    constructor(
        @Inject(EnumChatRepository.MESSAGE_REPOSITORY)
        private messageRepository: IMessageRepository,
    ) {}

    async exec(input: CreateMessageInput): Promise<Message> {
        const newMessage = this.messageFactory.createMessage(input);
        await this.messageRepository.save(newMessage);
        return newMessage;
    }
}
