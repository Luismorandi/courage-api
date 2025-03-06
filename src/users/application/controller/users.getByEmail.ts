import { Controller, Get, Param } from '@nestjs/common';
import { GetUserByEmailUseCase } from '../useCases/users.getUserByEmail';
import { User } from 'src/users/domain/user.domain';

@Controller('users/email')
export class GetUserByEmailController {
    constructor(private readonly getUserByEmailUseCase: GetUserByEmailUseCase) {}

    @Get(':email')
    async getUserByEmail(@Param('email') email: string): Promise<User> {
        const response = await this.getUserByEmailUseCase.exec(email);
        return response;
    }
}
