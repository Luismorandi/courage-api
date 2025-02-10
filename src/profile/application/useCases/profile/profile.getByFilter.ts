import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from 'src/shared/logger/logger.service';
import { FilterProfile } from 'src/profile/domain/profileInfo/profileInfo.repository';
import { Profile } from 'src/profile/domain/profile/profile.domain';
import { ProfileRepositoryService } from 'src/profile/infrastructure/profile.repository';

@Injectable()
export class GetByFilterProfileUseCase {
    private readonly logger: AppLogger = new AppLogger().withCtx(
        GetByFilterProfileUseCase.name,
    );
    constructor(private readonly profileRepository: ProfileRepositoryService) {}

    async exec(input: FilterProfile): Promise<Profile[]> {
        const profiles = await this.profileRepository.getByFilter(input);
        if (Array.isArray(profiles) && profiles.length === 0) {
            this.logger.error(`Profiles with this filter dont exist.`);
            throw new NotFoundException(`Profiles with this filter dont exist.`);
        }
        return profiles;
    }
}
