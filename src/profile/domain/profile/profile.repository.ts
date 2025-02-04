import { Profile } from './profile.domain';

export interface IProfileRepository {
    save(user: Profile): Promise<Profile | Error>;
    getByFilter(filters: FilterProfile): Promise<Profile[]>;
}

export interface FilterProfile {
    gender?: string[];
    ageRange?: { min: number; max: number };
    role?: string;
    status?: string;
    type?: Date;
}
