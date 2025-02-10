import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileInfo } from 'src/profile/domain/profileInfo/profileInfo.domain';
import { In, Repository } from 'typeorm';
import { ProfilePhotosEntity } from './profilePhotos.entity';
import { ProfilePhotosMapper } from './profilePhotos.mapper';
import { IProfilePhotosRepository } from 'src/profile/domain/profilePhotos/profilePhotos.repository';
import { ProfilePhotos } from 'src/profile/domain/profilePhotos/profilePhostos';

@Injectable()
export class ProfilePhotosPostgreRepository implements IProfilePhotosRepository {
    constructor(
        @InjectRepository(ProfilePhotosEntity)
        private readonly profilePhotosRepository: Repository<ProfilePhotosEntity>,
        private readonly profilePhotosMapper: ProfilePhotosMapper,
    ) {}
    async save(profilePhostos: ProfilePhotos, profile: ProfileInfo): Promise<void> {
        try {
            const photosEntities = this.profilePhotosMapper.toEntities(
                profilePhostos.getPhotos(),
                profile,
            );
            await this.profilePhotosRepository.save(photosEntities);
        } catch (err) {
            throw new Error(`Failed to save profile details: ${(err as Error).message}`);
        }
    }

    async getMany(ids: string[]): Promise<ProfilePhotosEntity[]> {
        try {
            const profilesPhotos = await this.profilePhotosRepository.find({
                where: { profile_id: In(ids) },
            });

            return profilesPhotos;
        } catch (err) {
            throw new Error(`Failed to get profiles: ${(err as Error).message}`);
        }
    }
}
