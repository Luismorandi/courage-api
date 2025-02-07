import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from 'src/shared/logger/logger.service';
import { Profile } from '../../domain/profile/profile.domain';

import { ProfilePostgreRepository } from 'src/profile/infrastructure/postgre/profile.postgre.repository';
import { FilterProfile } from 'src/profile/domain/profile/profile.repository';

@Injectable()
export class GetByFilterProfileUseCase {
    private readonly logger: AppLogger = new AppLogger().withCtx(
        GetByFilterProfileUseCase.name,
    );
    constructor(private readonly profileRepository: ProfilePostgreRepository) {}

    async exec(input: FilterProfile): Promise<Profile[]> {
        const profiles = await this.profileRepository.getByFilter(input);
        if (Array.isArray(profiles) && profiles.length === 0) {
            this.logger.error(`Profiles with this filter dont exist.`);
            throw new NotFoundException(`Profiles with this filter dont exist.`);
        }
        return profiles;
    }
}
