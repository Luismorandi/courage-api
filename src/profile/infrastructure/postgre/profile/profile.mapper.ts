import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ProfileInfo } from '../../../domain/profileInfo/profileInfo.domain';
import { ProfileEntity } from './profile.entity';
import { FilterProfile } from '../../../domain/profileInfo/profileInfo.repository';
import { ProfileRole } from '../../../domain/profileInfo/profileInfo.roles';
import { ProfileStatus } from '../../../domain/profileInfo/profileInfo.status';
import { ProfileTypes } from '../../../domain/profileInfo/profileInfo.types';
import { Gender } from '../../../domain/profileInfo/profileInfo.gender';
import { In } from 'typeorm';
import { CreateProfileInput } from 'src/profile/domain/profileInfo/profileInfo.dto';

@Injectable()
export class ProfileMapper {
    createProfileToEntity(profile: CreateProfileInput): ProfileEntity {
        return {
            id: randomUUID(),
            user_id: profile.userId,
            role: profile.role,
            type: profile.type,
            created_at: new Date(),
            updated_at: new Date(),
            status: profile.status,
            gender: profile.gender,
            age: profile.age,
            first_name: profile.firstName,
            last_name: profile.lastName,
        };
    }

    toEntity(profile: ProfileInfo): ProfileEntity {
        return {
            id: profile.getId(),
            user_id: profile.getUserId(),
            role: profile.getRole(),
            type: profile.getType(),
            created_at: profile.getCreatedAt(),
            updated_at: profile.getUpdatedAt(),
            status: profile.getStatus(),
            gender: profile.getGender(),
            age: profile.getAge(),
            first_name: profile.getFirstName(),
            last_name: profile.getLastName(),
        };
    }
    toDomain(profile: ProfileEntity): ProfileInfo {
        return new ProfileInfo({
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
            firstName: profile.first_name,
            lastName: profile.last_name,
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
