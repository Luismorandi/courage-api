import { Controller, Get, Param } from '@nestjs/common';
import { User } from 'src/users/domain/user.domain';
import { GetUserByIdUseCase } from '../useCases/users.getUserById';

@Controller('users/id')
export class GetUserByIdController {
    constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

    @Get(':id')
    async getUserByEmail(@Param('id') id: string): Promise<User> {
        const response = await this.getUserByIdUseCase.exec(id);
        return response;
    }
}
