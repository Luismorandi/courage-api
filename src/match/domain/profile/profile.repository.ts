import { IProfile } from './profile.domain';

export interface IProfileRepository {
    getManyProfiles(ids: string[]): Promise<IProfile[]>;
    getProfileByFilter(filter: FilterProfile): Promise<IProfile[]>;
}

export interface FilterProfile {
    gender?: string[];
    ageRange?: { min: number; max: number };
    role?: string;
    status?: string;
    type?: Date;
}
