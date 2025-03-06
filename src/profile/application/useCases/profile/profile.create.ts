import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileInput } from '../../../domain/profile/profile.dto';
import { AppLogger } from 'src/shared/logger/logger.service';
import { IProfileRepository } from 'src/profile/domain/profile/profile.repository';
import { Profile } from 'src/profile/domain/profile/profile.domain';
import { IUserRepository } from 'src/profile/domain/user/user.domain';
import { EnumProfileRepository } from 'src/profile/domain/profile/profile.enum';
@Injectable()
export class CreateProfileUseCase {
    private readonly logger: AppLogger = new AppLogger().withCtx(
        CreateProfileUseCase.name,
    );
    constructor(
        @Inject(EnumProfileRepository.PROFILE_REPOSITORY)
        private readonly profileRepository: IProfileRepository,
        @Inject(EnumProfileRepository.USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
    ) {}

    async exec(input: CreateProfileInput): Promise<Profile> {
        const user = await this.userRepository.getUserById(input.userId);
        if (!user) {
            this.logger.error(`User with id ${input.userId} doesn't exist.`);
            throw new NotFoundException(`User with id ${input.userId} doesn't exist.`);
        }

        const profile = await this.profileRepository.create(input);
        if (!profile) {
            this.logger.error(`profile with userId ${input.userId}`, profile);
            throw new NotFoundException(
                `Profile with userId ${input.userId} doesn't exist.`,
            );
        }

        return profile;
    }
}
