import { Module } from '@nestjs/common';
import { LoginController } from './application/controllers/login.controller';
import { AuthenticateUseCase } from './application/useCases/authenticate.useCase';
import { HttpModule } from '@nestjs/axios';
import { UserRestRepository } from './infrastructure/rest/user.rest.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { EnumAuthRepository } from './domain/auth.enum';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [
        { provide: EnumAuthRepository.USER_REPOSITORY, useClass: UserRestRepository },
        AuthenticateUseCase,
    ],
    controllers: [LoginController],
})
export class AuthModule {}
