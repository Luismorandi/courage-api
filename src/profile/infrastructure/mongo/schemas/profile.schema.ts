import { Schema } from 'mongoose';
import { Profile } from 'src/profile/domain/profile/profile.domain';

export type ProfileDocument = Omit<Profile, 'id'> & Document;

export const ProfileSchema = new Schema(
    {
        userId: { type: String, required: true },
        role: { type: String, required: true },
        status: { type: String, required: true },
        type: { type: String, required: true },
        gender: { type: String, required: true },
        age: { type: Number, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        photos: { type: [String], required: true },
        profileDetails: { type: Map, of: String, required: true },
    },
    {
        timestamps: true,
        id: false,
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform: (_doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                return ret;
            },
        },
        toObject: {
            virtuals: true,
            versionKey: false,
            transform: (_doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                return ret;
            },
        },
    },
);
