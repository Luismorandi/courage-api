import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/postgre/user.entity';
import { UserRepository } from './infrastructure/postgre/user.repository';
import { ProfileRestRepository } from './infrastructure/rest/profile.rest.repository';
import { HttpModule } from '@nestjs/axios';
import { GetUserByEmailUseCase } from './application/useCases/users.getUserByEmail';
import { GetUserByEmailController } from './application/controller/users.getByEmail';
import { GetUserByIdController } from './application/controller/users.getById';
import { GetUserByIdUseCase } from './application/useCases/users.getUserById';
import { GetManyUsersController } from './application/controller/users.getMany';
import { GetManyUsersUseCase } from './application/useCases/users.getMant';
import { CreateUserController } from './application/controller/users.create';
import { CreateUserUseCase } from './application/useCases/users.create';
import { EnumProfileRepository } from 'src/profile/domain/profile/profile.enum';

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
            provide: EnumProfileRepository.USER_REPOSITORY,
            useClass: UserRepository,
        },
        {
            provide: EnumProfileRepository.PROFILE_REPOSITORY,
            useClass: ProfileRestRepository,
        },

        GetUserByEmailUseCase,
        GetUserByIdUseCase,
        GetManyUsersUseCase,
        CreateUserUseCase,
    ],
    controllers: [
        GetUserByEmailController,
        GetUserByIdController,
        GetManyUsersController,
        CreateUserController,
    ],
})
export class UsersModule {}
