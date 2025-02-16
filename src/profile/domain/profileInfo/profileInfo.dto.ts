import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
} from 'class-validator';
import { Gender } from './profileInfo.gender';
import { ProfileRole } from './profileInfo.roles';
import { ProfileStatus } from './profileInfo.status';
import { ProfileTypes } from './profileInfo.types';
import { Details } from '../profileDetails/details';

export class CreateProfileInput {
    @IsEnum(ProfileTypes, { message: 'Invalid type' })
    type: string;

    @IsEnum(ProfileStatus, { message: 'Invalid status' })
    status: string;

    @IsEnum(ProfileRole, { message: 'Invalid role' })
    role: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsEnum(Gender, { message: 'Invalid gender' })
    gender: string;

    @IsObject()
    @IsOptional()
    profileDetails: Record<string, string>;

    @IsNumber()
    age: number;

    @IsOptional()
    photos: string[];
}

export class CreateProfile {
    @IsString()
    id: string;
    @IsEnum(ProfileTypes, { message: 'Invalid type' })
    type: string;

    @IsEnum(ProfileStatus, { message: 'Invalid status' })
    status: string;

    @IsEnum(ProfileRole, { message: 'Invalid role' })
    role: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsEnum(Gender, { message: 'Invalid gender' })
    gender: string;

    @IsObject()
    @IsOptional()
    profileDetails: Record<string, string>;

    @IsNumber()
    age: number;

    @IsOptional()
    photos: string[];
}

export interface INewProfile {
    id: string;
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
