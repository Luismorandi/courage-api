import { CreateProfileInput } from '../profileInfo/profileInfo.dto';
import { FilterProfile } from '../profileInfo/profileInfo.repository';
import { Profile } from './profile.domain';

export interface IProfileRepository {
    create(input: CreateProfileInput): Promise<Profile | Error>;
    getMany(ids: string[]): Promise<Profile[]>;
    getByFilter(filter: FilterProfile): Promise<Profile[]>;
}
