import { Match } from './match.domain';

export interface IMatchRepository {
    save(user: Match): Promise<Match | Error>;
}
