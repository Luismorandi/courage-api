import { Injectable } from '@nestjs/common';
import { GetMessagesInput } from 'src/chat/domain/message/message.dto';
import { Message } from 'src/chat/domain/message/message';
import { MessagePostgreRepository } from 'src/chat/infrastructure/postgre/message/message.repository';

@Injectable()
export class GetMessagesUseCase {
    constructor(private readonly messageRepository: MessagePostgreRepository) {}

    async exec(input: GetMessagesInput): Promise<Message[]> {
        const messages = await this.messageRepository.getMessages(
            input.receiverId,
            input.senderId,
        );
        return messages;
    }
}
