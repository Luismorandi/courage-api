import { Gender } from './profile/profile.gender';
import { ProfileRole } from './profile/profile.roles';
import { ProfileStatus } from './profile/profile.status';
import { ProfileTypes } from './profile/profile.types';
import { Details } from './profileDetails/details';

export interface CreateProfileInput {
    type: string;
    status: string;
    role: string;
    userId: string;
    gender: string;
    profileDetails: Record<Details, string>;
    age: number;
}

export interface INewProfile {
    id?: string;
    userId: string;
    role: ProfileRole;
    status: ProfileStatus;
    createdAt: Date;
    updatedAt: Date;
    type: ProfileTypes;
    gender: Gender;
    age: number;
    details?: Record<Details, string>;
    photos: string[];
}
