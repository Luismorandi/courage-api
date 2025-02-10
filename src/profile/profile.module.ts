import { Module } from '@nestjs/common';
import { CreateProfileUseCase } from './application/useCases/profile/profile.create';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './infrastructure/postgre/profile/profile.entity';
import { ProfilePostgreRepository } from './infrastructure/postgre/profile/profile.postgre.repository';
import { CreateProfileController } from './application/controllers/profile/profile.create';
import { HttpModule } from '@nestjs/axios';
import { UserRestRepository } from './infrastructure/rest/user.rest.repository';
import { GetManyProfileController } from './application/controllers/profile/profile.getMany';
import { GetManyProfileUseCase } from './application/useCases/profile/profile.getMany';
import { GetByFilterProfileUseCase } from './application/useCases/profile/profile.getByFilter';
import { GetByFilterController } from './application/controllers/profile/profule.getByFilter';
import { ProfileDetailsEntity } from './infrastructure/postgre/profileDetails/profileDetails.entity';
import { ProfilePhotosEntity } from './infrastructure/postgre/profilePhotos/profilePhotos.entity';
import { ProfileMapper } from './infrastructure/postgre/profile/profile.mapper';
import { ProfileDetailsMapper } from './infrastructure/postgre/profileDetails/profileDetails.mapper';
import { ProfilePhotosMapper } from './infrastructure/postgre/profilePhotos/profilePhotos.mapper';
import { ProfilePhotosPostgreRepository } from './infrastructure/postgre/profilePhotos/profilePhotos.repository';
import { ProfileDetailsPostgreRepository } from './infrastructure/postgre/profileDetails/profileDetails.repository';
import { ProfileRepositoryService } from './infrastructure/profile.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProfileEntity,
            ProfileDetailsEntity,
            ProfilePhotosEntity,
        ]),
        HttpModule.register({
            timeout: 500000000,
            maxRedirects: 5,
        }),
    ],
    providers: [
        CreateProfileUseCase,
        GetManyProfileUseCase,
        GetByFilterProfileUseCase,
        ProfilePostgreRepository,
        UserRestRepository,
        ProfileMapper,
        ProfileDetailsMapper,
        ProfilePhotosMapper,
        ProfilePhotosPostgreRepository,
        ProfileDetailsPostgreRepository,
        ProfileRepositoryService,
    ],
    controllers: [
        CreateProfileController,
        GetManyProfileController,
        GetByFilterController,
    ],
})
export class ProfileModule {}
