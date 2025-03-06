import { CreateProfileInput } from 'src/users/domain/profile.domain';
import { Profile } from './profile.domain';
import { FilterProfile } from './profile.dto';

export interface IProfileRepository {
    create(input: CreateProfileInput): Promise<Profile>;
    getMany(ids: string[]): Promise<Profile[]>;
    getByFilter(filter: FilterProfile): Promise<Profile[]>;
    update(profile: Profile): Promise<Profile>;
    getById(id: string): Promise<Profile>;
}
