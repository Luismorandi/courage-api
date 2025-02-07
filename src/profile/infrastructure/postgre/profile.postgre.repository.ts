import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../../domain/profile/profile.domain';
import { ProfileEntity } from './profile/profile.entity';
import {
    FilterProfile,
    IProfileRepository,
} from '../../domain/profile/profile.repository';
import { ProfileDetailsEntity } from './profileDetails/profileDetails.entity';
import { ProfileMapper } from './profile.mapper';
import { ProfilePhotosEntity } from './profilePhotos/profilePhotos.entity';

@Injectable()
export class ProfilePostgreRepository implements IProfileRepository {
    constructor(
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>,

        @InjectRepository(ProfileDetailsEntity)
        private readonly profileDetailsRepository: Repository<ProfileDetailsEntity>,
        @InjectRepository(ProfilePhotosEntity)
        private readonly profilePhotosRepository: Repository<ProfilePhotosEntity>,

        private readonly profileMapper: ProfileMapper, // Inyectamos el mapper
    ) {}

    async save(profile: Profile): Promise<Profile> {
        try {
            const profileEntity = this.profileMapper.toEntity(profile);
            await this.profileRepository.save(profileEntity);

            if (profile.getDetails()) {
                await this.saveProfileDetails(profile, profileEntity.id);
            }

            const photos = profile.getPhotos();
            if (photos && photos.length > 0) {
                await this.saveProfilePhotos(photos, profile);
            }

            return profile;
        } catch (err) {
            throw new Error(`Failed to save user: ${(err as Error).message}`);
        }
    }

    private async saveProfileDetails(profile: Profile, id: string): Promise<void> {
        try {
            if (!profile.getDetails()) return;

            const detailsEntities = this.profileMapper.toDetailsEntities(profile, id);
            await this.profileDetailsRepository.save(detailsEntities);
        } catch (err) {
            throw new Error(`Failed to save profile details: ${(err as Error).message}`);
        }
    }

    async saveProfilePhotos(photos: string[], profile: Profile): Promise<void> {
        try {
            const photosEntities = this.profileMapper.toPhotosEntities(photos, profile);
            await this.profilePhotosRepository.save(photosEntities);
        } catch (err) {
            throw new Error(`Failed to save profile details: ${(err as Error).message}`);
        }
    }

    async getMany(ids: string[]): Promise<Profile[]> {
        try {
            const profiles = await this.profileRepository.find({
                where: { id: In(ids) },
            });
            const profileDetails = await this.profileDetailsRepository.find({
                where: { profile_id: In(ids) },
            });

            return profiles.map((profile) =>
                this.profileMapper.toDomain(profile, profileDetails),
            );
        } catch (err) {
            throw new Error(`Failed to get profiles: ${(err as Error).message}`);
        }
    }

    async getByFilter(filters: FilterProfile): Promise<Profile[]> {
        try {
            const where: any = this.profileMapper.buildFilter(filters);
            const profiles = await this.profileRepository.find({ where });

            return profiles.map((profile) => this.profileMapper.toDomain(profile));
        } catch (err) {
            throw new Error(`Failed to get profiles: ${(err as Error).message}`);
        }
    }
}
