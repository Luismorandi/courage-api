import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileDetailsEntity } from './profileDetails.entity';
import { In, Repository } from 'typeorm';
import { ProfileDetailsMapper } from './profileDetails.mapper';
import { ProfileDetails } from 'src/profile/domain/profileDetails/profileDetails';

@Injectable()
export class ProfileDetailsPostgreRepository {
    constructor(
        @InjectRepository(ProfileDetailsEntity)
        private readonly profileDetailsRepository: Repository<ProfileDetailsEntity>,
        private readonly profileDetailsMapper: ProfileDetailsMapper,
    ) {}
    async save(profileDetails: ProfileDetails, id: string): Promise<void> {
        try {
            const detailsEntities = this.profileDetailsMapper.toEntities(
                profileDetails,
                id,
            );
            await this.profileDetailsRepository.save(detailsEntities);
        } catch (err) {
            throw new Error(`Failed to save profile details: ${(err as Error).message}`);
        }
    }

    async getMany(profileIds: string[]): Promise<ProfileDetailsEntity[]> {
        try {
            const profiles = await this.profileDetailsRepository.find({
                where: { profile_id: In(profileIds) },
            });
            return profiles;
        } catch (err) {
            throw new Error(`Failed to get profiles: ${(err as Error).message}`);
        }
    }
}
