import { Injectable } from '@nestjs/common';
import { ProfileDetailsEntity } from './profileDetails.entity';
import { randomUUID } from 'crypto';
import { Details } from 'src/profile/domain/profileDetails/details';
import { ProfileDetails } from 'src/profile/domain/profileDetails/profileDetails';

@Injectable()
export class ProfileDetailsMapper {
    toEntities(profile: ProfileDetails, profileId: string): ProfileDetailsEntity[] {
        return Object.entries(profile.getDetails() ?? {}).map(([key, value]) => ({
            id: randomUUID(),
            key: key as Details,
            value,
            profile_id: profileId,
            status: 'ACTIVE',
            created_at: new Date(),
            updated_at: new Date(),
        }));
    }
}
