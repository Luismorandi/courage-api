import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ProfileDetailsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    key: string;
    @Column()
    value: string;
    @Column()
    profile_id: string;

    @Column()
    status: string;
    @Column()
    created_at: Date;
    @Column()
    updated_at: Date;
}
