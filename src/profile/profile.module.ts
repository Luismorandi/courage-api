import { Module } from '@nestjs/common';
import { CreateProfileUseCase } from './application/useCases/profile.create';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './infrastructure/profile.entity';
import { ProfilePostgreRepository } from './infrastructure/profile.postgre.repository';
import { CreateProfileController } from './application/controllers/profile.create';
import { HttpModule } from '@nestjs/axios';
import { UserRestRepository } from './infrastructure/rest/user.rest.repository';
import { GetManyProfileController } from './application/controllers/profile.getMany';
import { GetManyProfileUseCase } from './application/useCases/profile.getMany';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProfileEntity]),
        HttpModule.register({
            timeout: 500000000,
            maxRedirects: 5,
        }),
    ],
    providers: [
        CreateProfileUseCase,
        GetManyProfileUseCase,
        ProfilePostgreRepository,
        UserRestRepository,
    ],
    controllers: [CreateProfileController, GetManyProfileController],
})
export class ProfileModule {}
