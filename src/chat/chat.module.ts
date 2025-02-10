import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './infrastructure/postgre/message/message.entity';
import { CreateMessageUseCase } from './application/useCase/message/message.create';
import { GetMessagesUseCase } from './application/useCase/message/message.getMany';
import { ChatGateway } from './application/gateway/chat.gatway';
import { MessageFactory } from './common/message.factory';
import { MessagePostgreRepository } from './infrastructure/postgre/message/message.repository';
import { MessageMapper } from './infrastructure/postgre/message/message.mapper';

@Module({
    imports: [TypeOrmModule.forFeature([MessageEntity])],
    providers: [
        CreateMessageUseCase,
        GetMessagesUseCase,
        ChatGateway,
        MessageFactory,
        MessagePostgreRepository,
        MessageMapper,
    ],
})
export class ChatModule {}
