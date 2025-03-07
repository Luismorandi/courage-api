import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/users/domain/user.domain';
import { CreateUserUseCase } from '../useCases/users.create';
import { CreateUserInput } from 'src/users/domain/users.dto';

@Controller('users')
export class CreateUserController {
    constructor(private readonly creareUserUseCase: CreateUserUseCase) {}

    @Post('')
    async createUser(@Body() input: CreateUserInput): Promise<User> {
        const newUser = await this.creareUserUseCase.exec(input);
        return newUser;
    }
}
