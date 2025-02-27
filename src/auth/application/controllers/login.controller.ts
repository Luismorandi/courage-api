import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthInput, AuthenticateUseCase } from '../useCases/authenticate.useCase';

@Controller('auth')
export class LoginController {
    constructor(private authenticateUseCase: AuthenticateUseCase) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() input: AuthInput) {
        return await this.authenticateUseCase.authenticate({
            username: input.username,
            password: input.password,
        });
    }
}
