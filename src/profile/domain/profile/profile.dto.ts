import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
} from 'class-validator';
import { Gender } from './profile.gender';
import { ProfileRole } from './profile.roles';
import { ProfileStatus } from './profile.status';
import { ProfileTypes } from './profile.types';

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

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

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

    @IsString()
    @IsNotEmpty()
    firstName: string;
    @IsString()
    @IsNotEmpty()
    lastName: string;

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

export class UpdateProfileInput {
    @IsOptional()
    type: string;

    @IsOptional()
    status: string;

    @IsOptional()
    role: string;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsOptional()
    gender: string;

    @IsOptional()
    profileDetails: Record<string, string>;

    @IsOptional()
    age: number;

    @IsOptional()
    photos: string[];
}

export interface IProfile {
    id: string;
    userId: string;
    role: ProfileRole;
    status: ProfileStatus;
    createdAt: Date;
    updatedAt: Date;
    type: ProfileTypes;
    gender: Gender;
    age: number;
    firstName: string;
    lastName: string;
    profileDetails: Record<string, string>;
    photos: string[];
}

export interface FilterProfile {
    gender?: string[];
    ageRange?: { min: number; max: number };
    role?: string;
    status?: string;
    type?: Date;
    userId?: string;
}
