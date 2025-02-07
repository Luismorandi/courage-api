import { Injectable } from '@nestjs/common';
import { CreateProfileInput } from '../domain/profile.dto';
import { Profile } from '../domain/profile/profile.domain';
import { ProfileRole } from '../domain/profile/profile.roles';
import { ProfileTypes } from '../domain/profile/profile.types';
import { Gender } from '../domain/profile/profile.gender';
import { ProfileStatus } from '../domain/profile/profile.status';

@Injectable()
export class ProfileFactory {
    createProfile(input: CreateProfileInput): Profile {
        return new Profile({
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
