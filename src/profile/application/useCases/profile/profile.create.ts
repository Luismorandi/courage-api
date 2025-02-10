import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProfileInput } from '../../../domain/profileInfo/profileInfo.dto';
import { AppLogger } from 'src/shared/logger/logger.service';
import { UserRestRepository } from 'src/profile/infrastructure/rest/user.rest.repository';
import { ProfileRepositoryService } from 'src/profile/infrastructure/profile.repository';
import { Profile } from 'src/profile/domain/profile/profile.domain';

@Injectable()
export class CreateProfileUseCase {
    private readonly logger: AppLogger = new AppLogger().withCtx(
        CreateProfileUseCase.name,
    );
    constructor(
        private readonly profileRepositoryService: ProfileRepositoryService,

        private readonly userService: UserRestRepository,
    ) {}

    async exec(input: CreateProfileInput): Promise<Profile> {
        const user = await this.userService.getUserById(input.userId);
        if (!user) {
            this.logger.error(`User with id ${input.userId} dont exist.`);
            throw new ConflictException(`User with id ${input.userId} dont exist.`);
        }

        const profile = await this.profileRepositoryService.create(input);
        if (profile instanceof Error) {
            this.logger.error(profile.message);
            throw new Error(profile.message);
        }

        return profile;
    }
}
