import {
    ConflictException,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Profile } from 'src/profile/domain/profile/profile.domain';
import { UpdateProfileInput } from 'src/profile/domain/profile/profile.dto';
import { EnumProfileRepository } from 'src/profile/domain/profile/profile.enum';
import { IProfileRepository } from 'src/profile/domain/profile/profile.repository';

@Injectable()
export class UpdateProfileUseCase {
    constructor(
        @Inject(EnumProfileRepository.PROFILE_REPOSITORY)
        private readonly profileRepository: IProfileRepository,
    ) {}

    async exec(input: UpdateProfileInput, profileId: string): Promise<Profile> {
        if (!profileId) {
            throw new ConflictException('Profile id is required');
        }
        const profile = await this.profileRepository.getById(profileId);
        if (!profile) {
            throw new NotFoundException(`Profile with id ${profileId} not found.`);
        }

        const updatedProfile = profile.updateProfile(input);

        const profileUpdated = await this.profileRepository.update(updatedProfile);
        if (!profileUpdated) {
            throw new InternalServerErrorException(
                `Profile with id ${profileId} not updated`,
            );
        }

        return profileUpdated;
    }
}
