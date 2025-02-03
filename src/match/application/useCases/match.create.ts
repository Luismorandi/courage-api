import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatchInput } from '../../domain/match.dto';
import { AppLogger } from 'src/shared/logger/logger.service';
import { Match } from 'src/match/domain/match/match.domain';
import { UserRestRepository } from 'src/match/infrastructure/rest/user.rest.repository';
import { MatchPostgreRepository } from 'src/match/infrastructure/match.postgre.repository';
import { MATCH_COUNT } from 'src/match/domain/match/matchCount.domain';

@Injectable()
export class CreateMatchUseCase {
    private readonly logger: AppLogger = new AppLogger().withCtx(CreateMatchUseCase.name);
    constructor(
        private readonly matchRepository: MatchPostgreRepository,
        private readonly userRepository: UserRestRepository,
    ) {}

    async create(input: CreateMatchInput): Promise<Match> {
        const usersToFind = [input.from, input.to];

        const users = await this.userRepository.getManyUsers(usersToFind);

        if (users.length < MATCH_COUNT) {
            this.logger.error(`Not found users with ids ${usersToFind}`);
            throw new NotFoundException(`Not found users with ids ${usersToFind}`);
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
