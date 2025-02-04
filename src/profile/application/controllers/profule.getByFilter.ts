import { Body, Controller, Post } from '@nestjs/common';
import { Profile } from '../../domain/profile/profile.domain';
import { FilterProfile } from 'src/profile/domain/profile/profile.repository';
import { GetByFilterProfileUseCase } from '../useCases/profile.getByFilter';

@Controller('profile/filter')
export class GetByFilterController {
    constructor(private readonly getByFilterUseCase: GetByFilterProfileUseCase) {}

    @Post('')
    async getByFilter(@Body() input: FilterProfile): Promise<Profile[]> {
        const profiles = await this.getByFilterUseCase.exec(input);
        return profiles;
    }
}
