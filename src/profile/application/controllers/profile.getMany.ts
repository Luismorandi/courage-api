import { Controller, Get, Query } from '@nestjs/common';
import { Profile } from '../../domain/profile/profile.domain';
import { GetManyProfileUseCase } from '../useCases/profile.getMany';

@Controller('profile/many')
export class GetManyProfileController {
    constructor(private readonly getManyProfileUseCase: GetManyProfileUseCase) {}

    @Get('')
    async getManyProfile(@Query('ids') ids: string): Promise<Profile[]> {
        const idsToService = ids.split(',');
        const profiles = await this.getManyProfileUseCase.exec(idsToService);
        return profiles;
    }
}
