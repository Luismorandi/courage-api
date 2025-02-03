import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../domain/profile/profile.domain';
import { ProfileEntity } from './profile.entity';
import { randomUUID } from 'crypto';
import { IProfileRepository } from '../domain/profile/profile.repository';

@Injectable()
export class ProfilePostgreRepository implements IProfileRepository {
    constructor(
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>,
    ) {}


    async save(profile: Profile): Promise<Profile|Error> {
        try {
            const profileRepository = this.fromDomain(profile);
            await this.profileRepository.save(profileRepository);
            return profile;
        } catch (err) {
            throw new Error(`Failed to save user: ${(err as Error).message}`);
        }
    }



    private fromDomain(profile: Profile): ProfileEntity {
        try {
            const id = profile.getId() ?? randomUUID();
            return {
                id: id ,
                user_id: profile.getUserId(),
                role: profile.getRole(),
                type: profile.getType(),
                created_at: profile.getCreatedAt(),
                updated_at: profile.getUpdatedAt(),
                status: profile.getStatus(),
            };
        } catch (err) {
            throw new Error(`Failed to map profile domain to entity: ${(err as Error).message}`);
        }
    }
}
