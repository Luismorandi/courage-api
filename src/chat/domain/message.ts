import { Injectable } from '@nestjs/common';
import { MessageStatus } from './messageStatus';

@Injectable()
export class Message {
    private id: string;
    private senderId: string;
    private content: string;
    private receiverId: string;
    private createdAt: Date;
    private status: MessageStatus;

    constructor(
        id: string,
        senderId: string,
        receiverId: string,
        content: string,
        createdAt: Date,
        status: MessageStatus,
    ) {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content;
        this.createdAt = createdAt;
        this.status = status;
    }
    getId(): string {
        return this.id;
    }
    getSenderId(): string {
        return this.senderId;
    }
    getReceiverId(): string {
        return this.receiverId;
    }
    getContent(): string {
        return this.content;
    }
    getCreatedAt(): Date {
        return this.createdAt;
    }
    getStatus(): MessageStatus {
        return this.status;
    }
    setStatus(status: MessageStatus): void {
        this.status = status;
    }
}
