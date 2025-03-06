import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { UsersController } from './application/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/user.entity';
import { UserRepository } from './infrastructure/postgre/user.repository';
import { ProfileRestRepository } from './infrastructure/rest/profile.rest.repository';
import { HttpModule } from '@nestjs/axios';
import { GetUserByEmailUseCase } from './application/useCases/users.getUserByEmail';
import { UserRepositoryService } from './infrastructure/user.repositorys';
import { GetUserByEmailController } from './application/controller/users.getByEmail';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        HttpModule.register({
            timeout: 500000,
            maxRedirects: 5,
        }),
    ],
    providers: [
        {
            provide: 'IUserRepository',
            useClass: UserRepository,
        },

        UsersService,
        UserRepository,
        ProfileRestRepository,
        GetUserByEmailUseCase,
        UserRepositoryService,
    ],
    controllers: [UsersController, GetUserByEmailController],
})
export class UsersModule {}
