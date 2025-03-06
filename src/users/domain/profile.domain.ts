import { User } from './user.domain';

export interface IProfileRepository {
    create(input: CreateProfileInput, user: User): Promise<void>;
}

export interface CreateProfileInput {
    type: string;

    status: string;

    role: string;

    userId: string;

    firstName: string;

    lastName: string;

    gender: string;

    profileDetails: Record<string, string>;

    age: number;

    photos: string[];
}

export const defaultProfile = {
    type: 'BASIC',
    status: 'ACTIVE',
    role: 'USER',
    userId: '',
    firstName: '',
    lastName: '',
    gender: 'OTHER',
    profileDetails: {},
    age: 0,
    photos: [],
};
