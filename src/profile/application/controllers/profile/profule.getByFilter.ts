import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetByFilterProfileUseCase } from '../../useCases/profile/profile.getByFilter';
import { Profile } from 'src/profile/domain/profile/profile.domain';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { FilterProfile } from 'src/profile/domain/profile/profile.dto';

@UseGuards(AuthGuard)
@Controller('profile/filter')
export class GetByFilterController {
    constructor(private readonly getByFilterUseCase: GetByFilterProfileUseCase) {}

    @Post('')
    async getByFilter(@Body() input: FilterProfile): Promise<Profile[]> {
        const profiles = await this.getByFilterUseCase.exec(input);
        return profiles;
    }
}
