import { IProfile } from './profile.domain';

export interface IProfileRepository {
    getManyProfiles(ids: string[]): Promise<IProfile[]>;
}
