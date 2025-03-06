import { Body, Controller, Post } from '@nestjs/common';
import { CreateProfileUseCase } from '../../useCases/profile/profile.create';
import { CreateProfileInput } from '../../../domain/profile/profile.dto';
import { Profile } from 'src/profile/domain/profile/profile.domain';

@Controller('profile/create')
export class CreateProfileController {
    constructor(private readonly createProfileUseCase: CreateProfileUseCase) {}

    @Post('')
    async createProfile(@Body() input: CreateProfileInput): Promise<Profile> {
        const newProfile = await this.createProfileUseCase.exec(input);
        return newProfile;
    }
}
