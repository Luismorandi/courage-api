import { Body, Controller, Param, Post } from '@nestjs/common';
import { Profile } from 'src/profile/domain/profile/profile.domain';
import { UpdateProfileUseCase } from '../../useCases/profile/profile.update';
import { UpdateProfileInput } from 'src/profile/domain/profile/profile.dto';

@Controller('profile/update')
export class UpdateProfileController {
    constructor(private readonly updateProfileUseCase: UpdateProfileUseCase) {}

    @Post(':profileId')
    async updateProfile(
        @Body() input: UpdateProfileInput,
        @Param('profileId') profileId: string,
    ): Promise<Profile> {
        const updatedProfile = await this.updateProfileUseCase.exec(input, profileId);
        return updatedProfile;
    }
}
