import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: any) {}

    @Post('login')
    async login(@Body() input: any) {
        return await this.authService.validate(input.username, input.password);
    }
}
