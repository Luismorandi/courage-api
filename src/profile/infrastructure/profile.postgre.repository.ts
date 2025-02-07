import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../domain/profile/profile.domain';
import { ProfileEntity } from './profile.entity';
import { randomUUID } from 'crypto';
import { FilterProfile, IProfileRepository } from '../domain/profile/profile.repository';
import { ProfileRole } from '../domain/profile/profile.roles';
import { ProfileStatus } from '../domain/profile/profile.status';
import { ProfileTypes } from '../domain/profile/profile.types';
import { Gender } from '../domain/profile/profile.gender';
import { ProfileDetails } from '../domain/profileDetails/profileDetails';
import { Details } from '../domain/profileDetails/details';
import { ProfileDetailsEntity } from './profileDetails.entity';

@Injectable()
export class ProfilePostgreRepository implements IProfileRepository {
    constructor(
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>,

        @InjectRepository(ProfileDetailsEntity)
        private readonly profileDetailsRepository: Repository<ProfileDetailsEntity>,
    ) {}

    async save(profile: Profile): Promise<Profile | Error> {
        try {
            const profileRepository = this.fromDomain(profile);
            await this.profileRepository.save(profileRepository);
            if (profile.getDetails()) {
                await this.saveProfileDetails(profile, profileRepository.id);
            }
            return profile;
        } catch (err) {
            throw new Error(`Failed to save user: ${(err as Error).message}`);
        }
    }

    async saveProfileDetails(profile: Profile, id?: string): Promise<null> {
        try {
            if (!profile.getDetails()) {
                return null;
            }

            const details = profile.getDetails() as Record<string, string>; // Asumiendo que 'details' es un Record
            const idProfile = profile.getId() ?? id;

            // Convertir el Record en un array de ProfileDetailsEntity
            const profileDetailsToRepo: ProfileDetailsEntity[] = Object.entries(
                details,
            ).map(([key, value]) => ({
                id: randomUUID(),
                key: key,
                value: value,
                profile_id: idProfile as string,
                status: 'ACTIVE',
                created_at: new Date(),
                updated_at: new Date(),
            }));
            await this.profileDetailsRepository.save(profileDetailsToRepo);
            return null;
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

            console.log(profileDetails);
            return profiles.map((profile) => {
                const detailsForProfile = profileDetails.filter(
                    (detail) => detail.profile_id === profile.id,
                );

                const profileWithDetails = this.toDomain(profile, detailsForProfile);

                return profileWithDetails;
            });
        } catch (err) {
            throw new Error(`Failed to save user: ${(err as Error).message}`);
        }
    }

    async getByFilter(filters: FilterProfile): Promise<Profile[]> {
        try {
            const where: any = {};

            if (filters.status) {
                where.status = filters.status;
            }

            if (filters.type) {
                where.type = filters.type;
            }

            if (filters.gender && filters.gender.length > 0) {
                where.gender = In(filters.gender);
            }

            if (filters.role) {
                where.role = filters.role;
            }

            const profiles = await this.profileRepository.find({
                where,
            });

            return profiles ? profiles.map((profile) => this.toDomain(profile)) : [];
        } catch (err) {
            throw new Error(`Failed to get profiles: ${(err as Error).message}`);
        }
    }

    private fromDomain(profile: Profile): ProfileEntity {
        try {
            const id = profile.getId() ?? randomUUID();
            return {
                id: id,
                user_id: profile.getUserId(),
                role: profile.getRole(),
                type: profile.getType(),
                created_at: profile.getCreatedAt(),
                updated_at: profile.getUpdatedAt(),
                status: profile.getStatus(),
                gender: profile.getGender(),
                age: profile.getAge(),
            };
        } catch (err) {
            throw new Error(
                `Failed to map profile domain to entity: ${(err as Error).message}`,
            );
        }
    }

    private toDomain(
        profile: ProfileEntity,
        profileDetailsEntity?: ProfileDetailsEntity[],
    ): Profile {
        // Definir profileMap como Record<Details, string>
        let profileMap: Record<Details, string> = {} as Record<Details, string>;

        if (profileDetailsEntity && profileDetailsEntity.length > 0) {
            profileDetailsEntity.forEach((details: ProfileDetailsEntity) => {
                // Asumiendo que 'details.key' es de tipo 'Details'
                profileMap[details.key as Details] = details.value;
            });
        }

        const profileDetails = new ProfileDetails([], profileMap); // Usar Record<Details, string>
        console.log(profileDetails);

        try {
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
                details: profileDetails.getDetails(),
            });
        } catch (err) {
            throw new Error(`Failed to map entity to domain: ${(err as Error).message}`);
        }
    }
}
