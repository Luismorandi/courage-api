import { INewProfile } from './profileInfo.dto';
import { Details } from '../profileDetails/details';
import { Gender } from './profileInfo.gender';
import { ProfileRole } from './profileInfo.roles';
import { ProfileStatus } from './profileInfo.status';
import { ProfileTypes } from './profileInfo.types';

export class ProfileInfo {
    private readonly id: string;
    private readonly userId: string;
    private role: ProfileRole;
    private status: ProfileStatus;
    private readonly createdAt: Date;
    private updatedAt: Date;
    private type: ProfileTypes;
    private gender: Gender;
    private age: number;
    private details?: Record<Details, string>;

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
    }

    getId(): string {
        return this.id;
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
