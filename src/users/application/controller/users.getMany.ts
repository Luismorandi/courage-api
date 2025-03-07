import { Controller, Get, Query } from '@nestjs/common';
import { User } from 'src/users/domain/user.domain';
import { GetManyUsersUseCase } from '../useCases/users.getMant';

@Controller('users')
export class GetManyUsersController {
    constructor(private readonly getManyUsersUseCase: GetManyUsersUseCase) {}

    @Get('many')
    async getManyUsers(@Query('ids') ids: string): Promise<User[]> {
        const idsToService = ids.split(',');
        const users = await this.getManyUsersUseCase.exec(idsToService);
        return users;
    }
}
