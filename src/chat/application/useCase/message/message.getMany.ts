import { Inject, Injectable } from '@nestjs/common';
import { GetMessagesInput } from 'src/chat/domain/message/message.dto';
import { Message } from 'src/chat/domain/message/message';
import { IMessageRepository } from 'src/chat/domain/message/message.repository';
import { EnumChatRepository } from 'src/chat/domain/chat.enum';

@Injectable()
export class GetMessagesUseCase {
    constructor(
        @Inject(EnumChatRepository.MESSAGE_REPOSITORY)
        private messageRepository: IMessageRepository,
    ) {}
    async exec(input: GetMessagesInput): Promise<Message[]> {
        const messages = await this.messageRepository.getMessages(
            input.receiverId,
            input.senderId,
        );
        return messages;
    }
}
