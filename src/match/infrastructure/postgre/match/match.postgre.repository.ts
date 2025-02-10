import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchEntity } from './match.entity';
import { randomUUID } from 'crypto';
import { IMatchRepository } from '../../../domain/match/match.repository';
import { Match } from '../../../domain/match/match.domain';

@Injectable()
export class MatchPostgreRepository implements IMatchRepository {
    constructor(
        @InjectRepository(MatchEntity)
        private readonly matchRepository: Repository<MatchEntity>,
    ) {}

    async save(match: Match): Promise<Match | Error> {
        try {
            const matchRepository = this.fromDomain(match);
            await this.matchRepository.save(matchRepository);
            return match;
        } catch (err) {
            throw new Error(`Failed to save match: ${(err as Error).message}`);
        }
    }

    private fromDomain(match: Match): MatchEntity {
        try {
            const id = match.getId() ?? randomUUID();
            return {
                id: id,
                from: match.getFrom(),
                to: match.getTo(),
                created_at: match.getCreatedAt(),
            };
        } catch (err) {
            throw new Error(
                `Failed to map match domain to entity: ${(err as Error).message}`,
            );
        }
    }
}
