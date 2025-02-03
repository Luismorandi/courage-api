import { Gender } from "./profile.gender";
import { ProfileRole } from "./profile.roles";
import { ProfileStatus } from "./profile.status";
import { ProfileTypes } from "./profile.types";

export class Profile {
  private readonly id?: string;
  private readonly userId: string;
  private role: ProfileRole;
  private status: ProfileStatus;
  private readonly createdAt: Date;
  private updatedAt: Date;
  private type: ProfileTypes;
  private gender: Gender;

  constructor({
    id,
    userId,
    role,
    status,
    createdAt = new Date(),
    updatedAt = new Date(),
    type,
    gender,
  }: {
    id?: string;
    userId: string;
    role: ProfileRole;
    status: ProfileStatus;
    createdAt?: Date;
    updatedAt?: Date;
    type: ProfileTypes;
    gender: Gender;
  }) {
    this.id = id;
    this.userId = userId;
    this.role = role;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.type = type;
    this.gender = gender;
  }

  getId(): string | null {
    if (!this.id ) return null;
    return this.id;
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
