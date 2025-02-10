import { Controller, Get, Query } from '@nestjs/common';
import { GetManyProfileUseCase } from '../../useCases/profile/profile.getMany';
import { Profile } from 'src/profile/domain/profile/profile.domain';

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
