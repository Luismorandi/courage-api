import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ProfilePhotosEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    url: string;
    @Column()
    status: string;
    @Column()
    type: string;
    @Column()
    profile_id: string;
    @Column()
    added_at: Date;
}
