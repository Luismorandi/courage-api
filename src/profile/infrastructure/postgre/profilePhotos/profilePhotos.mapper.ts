import { Injectable } from '@nestjs/common';
import { ProfileInfo } from 'src/profile/domain/profileInfo/profileInfo.domain';
import { randomUUID } from 'crypto';
import { ProfilePhotosEntity } from './profilePhotos.entity';

@Injectable()
export class ProfilePhotosMapper {
    toEntities(photos: string[], profile: ProfileInfo): ProfilePhotosEntity[] {
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
}
