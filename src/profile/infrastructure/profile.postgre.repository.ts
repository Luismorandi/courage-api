import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../domain/profile/profile.domain';
import { ProfileEntity } from './profile.entity';
import { randomUUID } from 'crypto';
import { IProfileRepository } from '../domain/profile/profile.repository';
import { ProfileRole } from '../domain/profile/profile.roles';
import { ProfileStatus } from '../domain/profile/profile.status';
import { ProfileTypes } from '../domain/profile/profile.types';
import { Gender } from '../domain/profile/profile.gender';

@Injectable()
export class ProfilePostgreRepository implements IProfileRepository {
    constructor(
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>,
    ) {}

    async save(profile: Profile): Promise<Profile | Error> {
        try {
            const profileRepository = this.fromDomain(profile);
            await this.profileRepository.save(profileRepository);
            return profile;
        } catch (err) {
            throw new Error(`Failed to save user: ${(err as Error).message}`);
        }
    }

    async getMany(ids: string[]): Promise<Profile[]> {
        try {
            const profiles = await this.profileRepository.find({
                where: { id: In(ids) },
            });
            return profiles ? profiles.map((user) => this.toDomain(user)) : [];
        } catch (err) {
            throw new Error(`Failed to save user: ${(err as Error).message}`);
        }
    }

    private fromDomain(profile: Profile): ProfileEntity {
        try {
            const id = profile.getId() ?? randomUUID();
            return {
                id: id,
                user_id: profile.getUserId(),
                role: profile.getRole(),
                type: profile.getType(),
                created_at: profile.getCreatedAt(),
                updated_at: profile.getUpdatedAt(),
                status: profile.getStatus(),
                gender: profile.getGender(),
            };
        } catch (err) {
            throw new Error(
                `Failed to map profile domain to entity: ${(err as Error).message}`,
            );
        }
    }

    private toDomain(profile: ProfileEntity): Profile {
        try {
            return new Profile({
                id: profile.id,
                userId: profile.user_id,
                role: profile.role as ProfileRole,
                status: profile.status as ProfileStatus,
                createdAt: profile.created_at,
                updatedAt: profile.updated_at,
                type: profile.type as ProfileTypes,
                gender: profile.gender as Gender,
            });
        } catch (err) {
            throw new Error(`Failed to map entity to domain: ${(err as Error).message}`);
        }
    }
}
