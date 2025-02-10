import { Injectable } from '@nestjs/common';
import { CreateProfile } from '../domain/profileInfo/profileInfo.dto';
import { ProfileInfo } from '../domain/profileInfo/profileInfo.domain';
import { ProfileRole } from '../domain/profileInfo/profileInfo.roles';
import { ProfileTypes } from '../domain/profileInfo/profileInfo.types';
import { Gender } from '../domain/profileInfo/profileInfo.gender';
import { ProfileStatus } from '../domain/profileInfo/profileInfo.status';

@Injectable()
export class ProfileFactory {
    createProfile(input: CreateProfile): ProfileInfo {
        return new ProfileInfo({
            id: input.id,
            userId: input.userId,
            role: input.role as ProfileRole,
            status: ProfileStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
            type: input.type as ProfileTypes,
            gender: input.gender as Gender,
            age: input.age,
            details: input.profileDetails || {},
            photos: input.photos || [],
        });
    }
}
