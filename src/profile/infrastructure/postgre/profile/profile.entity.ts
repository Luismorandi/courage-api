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
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    age: number;

    @Column()
    gender: string;
}
