import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class QuestionsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    type: string;
    @Column()
    status: string;
    @Column()
    value: string;
}
