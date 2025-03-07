import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { ContextFinder, FactoryStrategy } from 'src/match/domain/finder/finder.domain';
import { IProfile } from 'src/match/domain/profile/profile.domain';
import { AppLogger } from 'src/shared/logger/logger.service';
import { AI } from 'src/match/infrastructure/rest/ai.rest.respository';
import { IProfileRepository } from 'src/match/domain/profile/profile.repository';
import { EnumMatchRepository } from 'src/match/domain/match.enum';

@Injectable()
export class FinderPosibleMatchUseCase {
    private readonly logger: AppLogger = new AppLogger().withCtx(
        FinderPosibleMatchUseCase.name,
    );

    constructor(
        @Inject(EnumMatchRepository.PROFILE_REPOSITORY)
        private profileRepository: IProfileRepository,
        @Inject(EnumMatchRepository.AI_REPOSITORY) private aiRepository: AI,
    ) {}

    async exec(arg: Record<string, any>, name: string): Promise<IProfile[]> {
        const strategy = new FactoryStrategy(
            this.profileRepository,
            this.aiRepository,
            arg,
        ).getStrategy(name);
        if (strategy instanceof Error) {
            this.logger.error(`Not found strategy to find profiles with name:  ${name}`);
            throw new BadRequestException(
                `Not found strategy to find profiles with name:  ${name}`,
            );
        }
        const finder = new ContextFinder();
        finder.setFinderStrategy(strategy);
        const profiles = finder.findProfile();
        if (profiles instanceof Error) {
            this.logger.error(
                `Not found profiles. Error findprofiles with strategy:  ${name}`,
            );
            throw new BadRequestException(
                `Not found profiles. Error findprofiles with strategy:  ${name}`,
            );
        }
        return profiles;
    }
}
