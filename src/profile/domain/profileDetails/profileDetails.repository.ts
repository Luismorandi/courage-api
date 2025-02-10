import { ProfileDetails } from './profileDetails';

export interface IProfileDetailsRepository {
    save(profile: ProfileDetails, id: string): Promise<void>;
}
