import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProfileInput } from '../../domain/profile.dto';
import { AppLogger } from 'src/shared/logger/logger.service';
import { Profile } from '../../domain/profile/profile.domain';

import { ProfilePostgreRepository } from 'src/profile/infrastructure/postgre/profile.postgre.repository';
import { UserRestRepository } from 'src/profile/infrastructure/rest/user.rest.repository';
import { ProfileFactory } from 'src/profile/common/profile.factory';

@Injectable()
export class CreateProfileUseCase {
    private readonly logger: AppLogger = new AppLogger().withCtx(
        CreateProfileUseCase.name,
    );
    private readonly profileFactory: ProfileFactory = new ProfileFactory();
    constructor(
        private readonly profileRepository: ProfilePostgreRepository,
        private readonly userService: UserRestRepository,
    ) {}

    async exec(input: CreateProfileInput): Promise<Profile> {
        const user = await this.userService.getUserById(input.userId);
        if (!user) {
            this.logger.error(`User with id ${input.userId} dont exist.`);
            throw new ConflictException(`User with id ${input.userId} dont exist.`);
        }

        const newProfile = this.profileFactory.createProfile(input);

        await this.profileRepository.save(newProfile);

        return newProfile;
    }
}
