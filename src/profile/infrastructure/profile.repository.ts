import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Profile } from 'src/profile/domain/profile/profile.domain';
import {
    CreateProfileInput,
    FilterProfile,
} from 'src/profile/domain/profile/profile.dto';
import { MongoProfileRepository } from './mongo/profile.repository';
import { IProfileRepository } from '../domain/profile/profile.repository';
import { AppLogger } from 'src/shared/logger/logger.service';

@Injectable()
export class ProfileRepositoryService implements IProfileRepository {
    private readonly logger: AppLogger = new AppLogger().withCtx(
        ProfileRepositoryService.name,
    );
    constructor(private readonly profileRepo: MongoProfileRepository) {}

    async create(profileInput: CreateProfileInput): Promise<Profile> {
        try {
            const profile = await this.profileRepo.create(profileInput);
            return profile;
        } catch (err) {
            this.logger.error('Error creating profile- repository');
            throw new InternalServerErrorException('Failed to create profile.');
        }
    }

    async getMany(ids: string[]): Promise<Profile[]> {
        try {
            return await this.profileRepo.getMany(ids);
        } catch (err) {
            this.logger.error('Error getting profiles-repository');
            throw new InternalServerErrorException('Failed to get profiles.');
        }
    }

    async getByFilter(filters: FilterProfile): Promise<Profile[]> {
        try {
            const profiles = await this.profileRepo.getByFilter(filters);
            return profiles;
        } catch (err) {
            this.logger.error('Error getting profiles by filter-repository');
            throw new InternalServerErrorException('Failed to get profiles by filter.');
        }
    }
    async update(profile: Profile): Promise<Profile> {
        try {
            const updatedProfile = await this.profileRepo.update(profile);
            return updatedProfile;
        } catch (err) {
            this.logger.error('Error updating profile-repository');
            throw new InternalServerErrorException('Failed to update profile.');
        }
    }
    async getById(id: string): Promise<Profile> {
        try {
            const profile = await this.profileRepo.getById(id);
            return profile;
        } catch (err) {
            this.logger.error('Error getting profile by id-repository');
            throw new InternalServerErrorException('Failed to get profile by id.');
        }
    }
}
