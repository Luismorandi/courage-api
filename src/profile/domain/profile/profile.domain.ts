import { INewProfile } from '../profile.dto';
import { Details } from '../profileDetails/details';
import { Gender } from './profile.gender';
import { ProfileRole } from './profile.roles';
import { ProfileStatus } from './profile.status';
import { ProfileTypes } from './profile.types';

export class Profile {
    private readonly id?: string;
    private readonly userId: string;
    private role: ProfileRole;
    private status: ProfileStatus;
    private readonly createdAt: Date;
    private updatedAt: Date;
    private type: ProfileTypes;
    private gender: Gender;
    private age: number;
    private details?: Record<Details, string>;
    private photos?: string[];

    constructor(profile: INewProfile) {
        this.id = profile.id;
        this.userId = profile.userId;
        this.role = profile.role;
        this.status = profile.status;
        this.createdAt = profile.createdAt;
        this.updatedAt = profile.updatedAt;
        this.type = profile.type;
        this.gender = profile.gender;
        this.age = profile.age;
        this.details = profile.details;
        this.photos = profile.photos;
    }

    getId(): string | null {
        if (!this.id) return null;
        return this.id;
    }

    getPhotos(): string[] | null {
        if (!this.photos) return null;
        return this.photos;
    }

    getDetails(): Record<Details, string> | null {
        if (!this.details) return null;
        return this.details;
    }

    getAge(): number {
        return this.age;
    }

    getUserId(): string {
        return this.userId;
    }

    getGender(): Gender {
        return this.gender;
    }

    getRole(): ProfileRole {
        return this.role;
    }

    getStatus(): ProfileStatus {
        return this.status;
    }

    getType(): ProfileTypes {
        return this.type;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }
    setRole(role: ProfileRole): void {
        this.role = role;
        this.update();
    }

    setStatus(status: ProfileStatus): void {
        this.status = status;
        this.update();
    }

    setType(type: ProfileTypes): void {
        this.type = type;
        this.update();
    }

    private update(): void {
        this.updatedAt = new Date();
    }
}
