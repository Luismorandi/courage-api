import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageUseCase } from '../useCase/message/message.create';
import { GetMessagesUseCase } from '../useCase/message/message.getMany';
import { CreateMessageInput } from 'src/chat/domain/message/message.dto';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
    @WebSocketServer() server: Server;

    constructor(
        private readonly createMessage: CreateMessageUseCase,
        private readonly getMessages: GetMessagesUseCase,
    ) {}

    @SubscribeMessage('joinRoom')
    async joinRoom(
        @MessageBody() data: { receiverId: string; senderId: string },
        @ConnectedSocket() client: Socket,
    ) {
        const room = this.orderRoom(data.receiverId, data.senderId);
        client.join(room);

        const messages = await this.getMessages.exec({
            receiverId: data.receiverId,
            senderId: data.senderId,
        });

        client.emit('previousMessages', messages);
    }

    @SubscribeMessage('sendMessage')
    async handleMessage(@MessageBody() input: CreateMessageInput) {
        const savedMessage = await this.createMessage.exec(input);
        const room = this.orderRoom(input.receiverId, input.senderId);
        this.server.to(room).emit('receiveMessage', savedMessage);
    }

    private orderRoom(participant1: string, participant2: string): string {
        return participant1 > participant2
            ? participant1 + participant2
            : participant2 + participant1;
    }
}
