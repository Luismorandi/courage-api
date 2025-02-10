import { IsString } from 'class-validator';

export class CreateMessageInput {
    @IsString()
    receiverId: string;
    @IsString()
    senderId: string;

    @IsString()
    content: string;
}

export class GetMessagesInput {
    @IsString()
    receiverId: string;
    @IsString()
    senderId: string;
}
