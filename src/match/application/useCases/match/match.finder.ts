import { BadRequestException, Injectable } from '@nestjs/common';

import { ProfileRestRepository } from 'src/match/infrastructure/rest/profile.rest.repository';
import { ContextFinder, FactoryStrategy } from 'src/match/domain/finder/finder.domain';
import { IProfile } from 'src/match/domain/profile/profile.domain';
import { AppLogger } from 'src/shared/logger/logger.service';
import { AI } from 'src/match/infrastructure/rest/ai.rest.respository';

@Injectable()
export class FinderPosibleMatchUseCase {
    private readonly logger: AppLogger = new AppLogger().withCtx(
        FinderPosibleMatchUseCase.name,
    );
    constructor(
        private readonly profileRepository: ProfileRestRepository,
        private readonly aiRepository: AI,
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
