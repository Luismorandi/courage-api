import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ProfileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;
    @Column()
    role: string;

    @Column()
    status: string;
    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
    @Column()
    type: string;

    @Column()
    gender: string;
}
