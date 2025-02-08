import { MessageStatus } from 'src/chat/domain/messageStatus';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MessageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    receiver_id: string;

    @Column()
    sender_id: string;

    @Column({ type: 'enum', enum: ['SENT', 'DELIVERED', 'READ'], default: 'SENT' })
    status: MessageStatus;

    @Column()
    content: string;

    @Column()
    created_at: Date;
}
