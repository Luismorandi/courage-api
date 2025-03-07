import { Controller, Get } from '@nestjs/common';
import { User } from 'src/users/domain/user.domain';
import { GetAllUsersUseCase } from '../useCases/user.getAll';

@Controller('users')
export class GetUserByEmailController {
    constructor(private readonly getAllUsersUseCase: GetAllUsersUseCase) {}

    @Get('')
    async getAll(): Promise<User[]> {
        const response = await this.getAllUsersUseCase.exec();
        return response;
    }
}
