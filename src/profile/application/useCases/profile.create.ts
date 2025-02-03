import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProfileInput } from '../../domain/profile.dto';
import { AppLogger } from 'src/shared/logger/logger.service';
import { Profile } from '../../domain/profile/profile.domain';
import { ProfileRole } from '../../domain/profile/profile.roles';
import { ProfileTypes } from '../../domain/profile/profile.types';
import { ProfileStatus } from '../../domain/profile/profile.status';

import { ProfilePostgreRepository } from 'src/profile/infrastructure/profile.postgre.repository';
import { UserRestRepository } from 'src/profile/infrastructure/rest/user.rest.repository';
import { Gender } from 'src/profile/domain/profile/profile.gender';

@Injectable()
export class CreateProfileUseCase {
    private readonly logger: AppLogger= new AppLogger().withCtx(CreateProfileUseCase.name)
    constructor(private readonly profileRepository: ProfilePostgreRepository, private readonly userRepository: UserRestRepository
    ) {
    }

    async create(input: CreateProfileInput): Promise<Profile> {

        const existRole= Object.values(ProfileRole).includes(input.role as ProfileRole)
        if (!existRole) {
            this.logger.error(`Invalid role ${input.role}. Expected values are ${Object.values(ProfileRole).join(', ')}`);
            throw new ConflictException(`Invalid role ${input.role}.`);
        }

        const existGender= Object.values(Gender).includes(input.gender as Gender)
        if (!existGender) {
            this.logger.error(`Invalid gender ${input.gender}. Expected values are ${Object.values(ProfileRole).join(', ')}`);
            throw new ConflictException(`Invalid role ${input.role}.`);
        }

        const existType = Object.values(ProfileTypes).includes(input.type as ProfileTypes)
        if (!existType) {
            this.logger.error(`Invalid type ${input.type}. `);
            throw new ConflictException(`Invalid type ${input.type}.`);
        }

        const user= await this.userRepository.getUserById(input.userId);
        if (!user) {
            this.logger.error(`User with id ${input.userId} dont exist.`);
            throw new ConflictException(`User with id ${input.userId} dont exist.`);
        }
        
            const newProfile = new Profile({ 
                userId: input.userId,
                role: input.role as ProfileRole,
                status: ProfileStatus.ACTIVE,
                createdAt: new Date(), 
                updatedAt: new Date(),
                type: input.type as ProfileTypes,
                gender: input.gender as Gender
              }
            );
    
            await this.profileRepository.save(newProfile);
    
            return newProfile;
       
    }
    

}
