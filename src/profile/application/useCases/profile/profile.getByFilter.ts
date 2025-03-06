import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from 'src/shared/logger/logger.service';
import { Profile } from 'src/profile/domain/profile/profile.domain';
import { FilterProfile } from 'src/profile/domain/profile/profile.dto';
import { IProfileRepository } from 'src/profile/domain/profile/profile.repository';
import { EnumProfileRepository } from 'src/profile/domain/profile/profile.enum';

@Injectable()
export class GetByFilterProfileUseCase {
    private readonly logger: AppLogger = new AppLogger().withCtx(
        GetByFilterProfileUseCase.name,
    );
    constructor(
        @Inject(EnumProfileRepository.PROFILE_REPOSITORY)
        private readonly profileRepository: IProfileRepository,
    ) {}

    async exec(input: FilterProfile): Promise<Profile[]> {
        const profiles = await this.profileRepository.getByFilter(input);
        if (Array.isArray(profiles) && profiles.length === 0) {
            this.logger.error(`Profiles with this filter dont exist.`);
            throw new NotFoundException(`Profiles with this filter dont exist.`);
        }
        return profiles;
    }
}
