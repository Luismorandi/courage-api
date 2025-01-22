import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: string;

 
    @Column()
    email: string;
    @Column()
    first_name: string;

    @Column()
    last_name: string;
    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}
