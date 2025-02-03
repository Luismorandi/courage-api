import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatchInput } from '../../domain/match.dto';
import { AppLogger } from 'src/shared/logger/logger.service';
import { Match } from 'src/match/domain/match/match.domain';
import { MatchPostgreRepository } from 'src/match/infrastructure/match.postgre.repository';
import { MATCH_COUNT } from 'src/match/domain/match/matchCount.domain';
import { ProfileRestRepository } from 'src/match/infrastructure/rest/profile.rest.repository';

@Injectable()
export class CreateMatchUseCase {
    private readonly logger: AppLogger = new AppLogger().withCtx(CreateMatchUseCase.name);
    constructor(
        private readonly matchRepository: MatchPostgreRepository,
        private readonly profileRepository: ProfileRestRepository,
    ) {}

    async create(input: CreateMatchInput): Promise<Match> {
        const profilesToFind = [input.from, input.to];

        const profiles = await this.profileRepository.getManyProfiles(profilesToFind);

        if (profiles.length < MATCH_COUNT) {
            this.logger.error(`Not found users with ids ${profilesToFind}`);
            throw new NotFoundException(`Not found users with ids ${profilesToFind}`);
        }
        const newMatch = new Match({
            from: input.from,
            to: input.to,
            createdAt: new Date(),
        });

        await this.matchRepository.save(newMatch);

        return newMatch;
    }
}
