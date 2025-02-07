import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Profile } from '../../domain/profile/profile.domain';
import { ProfileEntity } from './profile/profile.entity';
import { ProfileDetailsEntity } from './profileDetails/profileDetails.entity';
import { FilterProfile } from '../../domain/profile/profile.repository';
import { ProfileRole } from '../../domain/profile/profile.roles';
import { ProfileStatus } from '../../domain/profile/profile.status';
import { ProfileTypes } from '../../domain/profile/profile.types';
import { Gender } from '../../domain/profile/profile.gender';
import { Details } from '../../domain/profileDetails/details';
import { ProfileDetails } from '../../domain/profileDetails/profileDetails';
import { In } from 'typeorm';
import { ProfilePhotosEntity } from './profilePhotos/profilePhotos.entity';

@Injectable()
export class ProfileMapper {
    toEntity(profile: Profile): ProfileEntity {
        return {
            id: profile.getId() ?? randomUUID(),
            user_id: profile.getUserId(),
            role: profile.getRole(),
            type: profile.getType(),
            created_at: profile.getCreatedAt(),
            updated_at: profile.getUpdatedAt(),
            status: profile.getStatus(),
            gender: profile.getGender(),
            age: profile.getAge(),
        };
    }

    toDetailsEntities(profile: Profile, profileId: string): ProfileDetailsEntity[] {
        return Object.entries(profile.getDetails() ?? {}).map(([key, value]) => ({
            id: randomUUID(),
            key: key as Details,
            value,
            profile_id: profileId,
            status: 'ACTIVE',
            created_at: new Date(),
            updated_at: new Date(),
        }));
    }

    toPhotosEntities(photos: string[], profile: Profile): ProfilePhotosEntity[] {
        if (photos.length > 0) {
            return photos.map((photo) => ({
                id: randomUUID(),
                url: photo,
                status: 'ACTIVE',
                type: 'PROFILE_PHOTO',
                profile_id: profile.getUserId(),
                added_at: new Date(),
            }));
        }
        return [];
    }

    toDomain(
        profile: ProfileEntity,
        profileDetailsEntity?: ProfileDetailsEntity[],
    ): Profile {
        let profileMap: Record<Details, string> = Object.values(Details).reduce(
            (acc, key) => {
                acc[key as Details] = '';
                return acc;
            },
            {} as Record<Details, string>,
        );
        profileDetailsEntity?.forEach((details) => {
            profileMap[details.key as Details] = details.value;
        });

        return new Profile({
            id: profile.id,
            userId: profile.user_id,
            role: profile.role as ProfileRole,
            status: profile.status as ProfileStatus,
            createdAt: profile.created_at,
            updatedAt: profile.updated_at,
            type: profile.type as ProfileTypes,
            gender: profile.gender as Gender,
            age: profile.age,
            photos: [],
            details: new ProfileDetails(profileMap).getDetails(),
        });
    }

    buildFilter(filters: FilterProfile): any {
        const where: any = {};
        if (filters.status) where.status = filters.status;
        if (filters.type) where.type = filters.type;
        if (filters.gender?.length) where.gender = In(filters.gender);
        if (filters.role) where.role = filters.role;
        return where;
    }
}
