import { Body, Controller, Post } from '@nestjs/common';
import { CreateProfileUseCase } from '../useCases/profile.create';
import { Profile } from '../../domain/profile/profile.domain';
import { CreateProfileInput } from '../../domain/profile.dto';

@Controller('profile/create')
export class CreateProfileController {

    constructor(private readonly profile: CreateProfileUseCase){

    }

    @Post('')
    async createProfile(@Body() input: CreateProfileInput): Promise<Profile> {
            const newProfile = await this.profile.create(input);
            return newProfile

    }
    
}
