import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileInfo } from '../../../domain/profileInfo/profileInfo.domain';
import { ProfileEntity } from './profile.entity';
import { FilterProfile } from '../../../domain/profileInfo/profileInfo.repository';
import { ProfileMapper } from './profile.mapper';
import { CreateProfileInput } from 'src/profile/domain/profileInfo/profileInfo.dto';

@Injectable()
export class ProfilePostgreRepository {
    constructor(
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>,
        private readonly profileMapper: ProfileMapper,
    ) {}

    async save(profile: CreateProfileInput): Promise<ProfileInfo> {
        try {
            const toEntity = this.profileMapper.createProfileToEntity(profile);
            const profileEntity = await this.profileRepository.save(toEntity);

            return this.profileMapper.toDomain(profileEntity);
        } catch (err) {
            throw new Error(`Failed to save profile: ${(err as Error).message}`);
        }
    }

    async getMany(ids: string[]): Promise<ProfileInfo[]> {
        try {
            const profiles = await this.profileRepository.find({
                where: { id: In(ids) },
            });
            return profiles.map((profile) => this.profileMapper.toDomain(profile));
        } catch (err) {
            throw new Error(`Failed to get profiles: ${(err as Error).message}`);
        }
    }

    async getByFilter(filters: FilterProfile): Promise<ProfileInfo[]> {
        try {
            const where: any = this.profileMapper.buildFilter(filters);
            const profiles = await this.profileRepository.find({ where });

            return profiles.map((profile) => this.profileMapper.toDomain(profile));
        } catch (err) {
            throw new Error(`Failed to get profiles: ${(err as Error).message}`);
        }
    }
}
