import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IProfileRepository } from 'src/profile/domain/profile/profile.repository';
import {
    CreateProfileInput,
    FilterProfile,
    IProfile,
} from 'src/profile/domain/profile/profile.dto';
import { Profile } from 'src/profile/domain/profile/profile.domain';
import { ProfileRole } from 'src/profile/domain/profile/profile.roles';
import { ProfileStatus } from 'src/profile/domain/profile/profile.status';
import { ProfileTypes } from 'src/profile/domain/profile/profile.types';
import { Gender } from 'src/profile/domain/profile/profile.gender';
import { v4 as uuidv4 } from 'uuid';
import { ProfileDocument } from './schemas/profile.schema';
import { EnumProfile } from 'src/profile/domain/profile/profile.enum';

@Injectable()
export class MongoProfileRepository implements IProfileRepository {
    constructor(
        @InjectModel(EnumProfile.PROFILE)
        private readonly profileModel: Model<ProfileDocument>,
    ) {}

    async create(input: CreateProfileInput): Promise<Profile> {
        const profile = this.createProfile(input);
        const createdProfile = new this.profileModel(profile);
        const savedDoc = await createdProfile.save();
        return this.mapDocumentToProfile(savedDoc.toObject());
    }

    async getMany(ids: string[]): Promise<Profile[]> {
        const docs = await this.profileModel.find({ _id: { $in: ids } }).exec();
        return docs.map((doc) => this.mapDocumentToProfile(doc.toObject()));
    }

    async getByFilter(filter: FilterProfile): Promise<Profile[]> {
        const query: any = { ...filter };

        if (filter.role) {
            query['role'] = filter.role;
        }
        if (filter.userId) {
            query['userId'] = filter.userId;
        }
        if (filter.status) {
            query['status'] = filter.status;
        }
        if (filter.gender) {
            query['gender'] = filter.gender;
        }

        const docs = await this.profileModel.find(query).exec();
        return docs.map((doc) => this.mapDocumentToProfile(doc.toObject()));
    }

    async update(profile: Profile): Promise<Profile> {
        const updatedDoc = await this.profileModel
            .findByIdAndUpdate(profile.getId(), profile, { new: true })
            .exec();

        if (!updatedDoc) {
            throw new NotFoundException(`Profile with id ${profile.getId()} not found`);
        }

        const plainProfile = updatedDoc.toObject();
        return this.mapDocumentToProfile(plainProfile);
    }

    async getById(id: string): Promise<Profile> {
        const profile = await this.profileModel.findById(id);

        if (!profile) {
            throw new NotFoundException(`Profile with id ${id} not found`);
        }

        const profileObject = profile.toObject();
        return this.mapDocumentToProfile(profileObject);
    }

    private createProfile(input: CreateProfileInput): IProfile {
        const id = uuidv4();
        const profile: IProfile = {
            id: id,
            userId: input.userId,
            role: input.role as ProfileRole,
            status: input.status as ProfileStatus,
            createdAt: new Date(),
            updatedAt: new Date(),
            type: input.type as ProfileTypes,
            gender: input.gender as Gender,
            age: input.age,
            firstName: input.firstName,
            lastName: input.lastName,
            profileDetails: input.profileDetails,
            photos: input.photos,
        };
        return profile;
    }

    private mapDocumentToProfile(doc: any): Profile {
        const profileData: IProfile = {
            id: doc.id.toString(),
            userId: doc.userId,
            role: doc.role,
            status: doc.status,
            type: doc.type,
            gender: doc.gender,
            age: doc.age,
            firstName: doc.firstName,
            lastName: doc.lastName,
            photos: doc.photos,
            profileDetails:
                doc.profileDetails instanceof Map
                    ? Object.fromEntries(doc.profileDetails)
                    : doc.profileDetails,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
        return new Profile(profileData);
    }
}
