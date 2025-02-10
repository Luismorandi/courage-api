import { Body, Controller, Post } from '@nestjs/common';
import { FilterProfile } from 'src/profile/domain/profileInfo/profileInfo.repository';
import { GetByFilterProfileUseCase } from '../../useCases/profile/profile.getByFilter';
import { Profile } from 'src/profile/domain/profile/profile.domain';

@Controller('profile/filter')
export class GetByFilterController {
    constructor(private readonly getByFilterUseCase: GetByFilterProfileUseCase) {}

    @Post('')
    async getByFilter(@Body() input: FilterProfile): Promise<Profile[]> {
        const profiles = await this.getByFilterUseCase.exec(input);
        return profiles;
    }
}
