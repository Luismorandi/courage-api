import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class QuestionsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    type: string;
    @Column({ default: 'ACTIVE' })
    status: string;
    @Column()
    value: string;
    @Column()
    created_at: Date;
    @Column()
    updated_at: Date;
}
