import { IProfile, UpdateProfileInput } from './profile.dto';
import { Gender } from './profile.gender';
import { ProfileRole } from './profile.roles';
import { ProfileStatus } from './profile.status';
import { ProfileTypes } from './profile.types';

export class Profile {
    private readonly id: string;
    private readonly userId: string;
    private role: ProfileRole;
    private status: ProfileStatus;
    private readonly createdAt: Date;
    private updatedAt: Date;
    private type: ProfileTypes;
    private gender: Gender;
    private age: number;
    private firstName: string;
    private lastName: string;
    private profileDetails: Record<string, string>;
    private photos: string[];

    constructor(profile: IProfile) {
        this.id = profile.id;
        this.userId = profile.userId;
        this.role = profile.role;
        this.status = profile.status;
        this.createdAt = profile.createdAt;
        this.updatedAt = profile.updatedAt;
        this.type = profile.type;
        this.gender = profile.gender;
        this.age = profile.age;
        this.firstName = profile.firstName;
        this.lastName = profile.lastName;
        this.profileDetails = profile.profileDetails;
        this.photos = profile.photos;
    }

    getId(): string {
        return this.id;
    }

    getAge(): number {
        return this.age;
    }
    getFirstName(): string {
        return this.firstName;
    }
    getLastName(): string {
        return this.lastName;
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
    setGender(gender: Gender): void {
        this.gender = gender;
        this.update();
    }
    setAge(age: number): void {
        this.age = age;
        this.update();
    }
    setFirstName(firstName: string): void {
        this.firstName = firstName;
        this.update();
    }
    setLastName(lastName: string): void {
        this.lastName = lastName;
        this.update();
    }
    setProfileDetails(details: Record<string, string>): void {
        this.profileDetails = details;
        this.update();
    }
    setPhotos(photos: string[]): void {
        this.photos = photos;
        this.update();
    }

    getProfileDetails(): Record<string, string> {
        return this.profileDetails;
    }

    getPhotos(): string[] {
        return this.photos;
    }

    private update(): void {
        this.updatedAt = new Date();
    }

    updateProfile(input: UpdateProfileInput): Profile {
        if (input.age) {
            this.setAge(input.age);
        }
        if (input.status) {
            this.setStatus(input.status as ProfileStatus);
        }
        if (input.type) {
            this.setType(input.type as ProfileTypes);
        }
        if (input.gender) {
            this.setGender(input.gender as Gender);
        }

        if (input.firstName) {
            this.setFirstName(input.firstName);
        }
        if (input.lastName) {
            this.setLastName(input.lastName);
        }

        if (input.photos) {
            this.setPhotos(input.photos);
        }

        if (input.profileDetails) {
            this.setProfileDetails(input.profileDetails);
        }

        return this;
    }
}
