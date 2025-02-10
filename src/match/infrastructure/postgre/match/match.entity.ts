import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MatchEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    from: string;
    @Column()
    to: string;

    @Column()
    created_at: Date;
}
