import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from 'src/shared/logger/logger.service';
import { Profile } from '../../domain/profile/profile.domain';

import { ProfilePostgreRepository } from 'src/profile/infrastructure/postgre/profile.postgre.repository';

@Injectable()
export class GetManyProfileUseCase {
    private readonly logger: AppLogger = new AppLogger().withCtx(
        GetManyProfileUseCase.name,
    );
    constructor(private readonly profileRepository: ProfilePostgreRepository) {}

    async exec(ids: string[]): Promise<Profile[]> {
        const profiles = await this.profileRepository.getMany(ids);
        if (Array.isArray(profiles) && profiles.length === 0) {
            this.logger.error(`Profiles with id ${ids} dont exist.`);
            throw new NotFoundException(`Profiles with id ${ids} dont exist.`);
        }
        return profiles;
    }
}
