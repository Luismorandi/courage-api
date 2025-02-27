import { Injectable } from '@nestjs/common';
import { ProfilePostgreRepository } from './postgre/profile/profile.postgre.repository';
import { ProfileDetailsPostgreRepository } from './postgre/profileDetails/profileDetails.repository';
import { ProfilePhotosPostgreRepository } from './postgre/profilePhotos/profilePhotos.repository';
import { CreateProfileInput } from '../domain/profileInfo/profileInfo.dto';
import { Profile } from '../domain/profile/profile.domain';
import { ProfileDetails } from '../domain/profileDetails/profileDetails';
import { ProfilePhotos } from '../domain/profilePhotos/profilePhostos';
import { IProfileRepository } from '../domain/profile/profile.repository';
import { Details } from '../domain/profileDetails/details';
import { FilterProfile } from '../domain/profileInfo/profileInfo.repository';
import { ProfileInfo } from '../domain/profileInfo/profileInfo.domain';
import { ProfileDetailsEntity } from './postgre/profileDetails/profileDetails.entity';
import { ProfilePhotosEntity } from './postgre/profilePhotos/profilePhotos.entity';

@Injectable()
export class ProfileRepositoryService implements IProfileRepository {
    constructor(
        private readonly profileInfo: ProfilePostgreRepository,
        private readonly profileDetailsRepo: ProfileDetailsPostgreRepository,
        private readonly profilePhotosRepo: ProfilePhotosPostgreRepository,
    ) {}

    async create(profileInput: CreateProfileInput): Promise<Profile | Error> {
        const profileInfo = await this.profileInfo.save(profileInput);

        const profileDetails = profileInput.profileDetails
            ? await this.saveProfileDetails(
                  profileInput.profileDetails,
                  profileInfo.getId(),
              )
            : undefined;

        const profilePhotos = profileInput.photos?.length
            ? await this.saveProfilePhotos(profileInput.photos, profileInfo)
            : undefined;

        return new Profile(profileInfo, profilePhotos, profileDetails);
    }

    async getMany(ids: string[]): Promise<Profile[]> {
        return this.getProfiles(ids);
    }

    async getByFilter(filters: FilterProfile): Promise<Profile[]> {
        const profilesInfo = await this.profileInfo.getByFilter(filters);
        const ids = profilesInfo.map((profile) => profile.getId());
        return this.getProfiles(ids);
    }

    private async getProfiles(ids: string[]): Promise<Profile[]> {
        const [profilesInfo, profileDetailsEntity, profilePhotosEntity] =
            await Promise.all([
                this.profileInfo.getMany(ids),
                this.profileDetailsRepo.getMany(ids),
                this.profilePhotosRepo.getMany(ids),
            ]);

        return this.mapProfiles(profilesInfo, profileDetailsEntity, profilePhotosEntity);
    }

    private mapProfiles(
        profilesInfo: ProfileInfo[],
        profileDetailsEntity: ProfileDetailsEntity[],
        profilePhotosEntity: ProfilePhotosEntity[],
    ): Profile[] {
        return profilesInfo.map((profile) => {
            const profileId = profile.getId();
            const profileDetails = this.buildProfileDetails(
                profileId,
                profileDetailsEntity,
            );
            const profilePhotos = this.buildProfilePhotos(profileId, profilePhotosEntity);

            return new Profile(profile, profilePhotos, profileDetails);
        });
    }

    private buildProfileDetails(
        profileId: string,
        detailsEntity: ProfileDetailsEntity[],
    ): ProfileDetails | undefined {
        const detailsMap: ProfileDetails = new ProfileDetails(
            {} as Record<Details, string>,
        );

        detailsEntity.forEach((detail) => {
            if (detail.profile_id === profileId) {
                detailsMap.setDetail(detail.key, detail.value);
            }
        });

        return detailsMap;
    }

    ///REVISAR
    private buildProfilePhotos(
        profileId: string,
        photosEntity: ProfilePhotosEntity[],
    ): ProfilePhotos | undefined {
        const photos = photosEntity
            .filter((photo) => photo.profile_id === profileId)
            .map((photo) => photo.url);

        return photos.length ? new ProfilePhotos(photos) : undefined;
    }

    private async saveProfileDetails(
        details: Record<Details, string>,
        profileId: string,
    ) {
        const profileDetails = new ProfileDetails(details);
        await this.profileDetailsRepo.save(profileDetails, profileId);
        return profileDetails;
    }

    private async saveProfilePhotos(photos: string[], profileInfo: any) {
        const profilePhotos = new ProfilePhotos(photos);
        await this.profilePhotosRepo.save(profilePhotos, profileInfo);
        return profilePhotos;
    }
}
