import { Module } from '@nestjs/common';
import { LoginController } from './application/controllers/login.controller';
import { AuthenticateUseCase } from './application/useCases/authenticate.useCase';
import { HttpModule } from '@nestjs/axios';
import { UserRestRepository } from './infrastructure/rest/user.rest.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        HttpModule.register({
            timeout: 50000,
            maxRedirects: 5,
        }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [AuthenticateUseCase, UserRestRepository],
    controllers: [LoginController],
})
export class AuthModule {}
