import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { Profile } from './domain/profile/profile.domain';
import { MongoProfileRepository } from './infrastructure/mongo/profile.repository';
import { CreateProfileUseCase } from './application/useCases/profile/profile.create';
import { CreateProfileController } from './application/controllers/profile/profile.create';
import { UserRestRepository } from './infrastructure/rest/user.rest.repository';
import { GetManyProfileController } from './application/controllers/profile/profile.getMany';
import { GetManyProfileUseCase } from './application/useCases/profile/profile.getMany';
import { GetByFilterProfileUseCase } from './application/useCases/profile/profile.getByFilter';
import { GetByFilterController } from './application/controllers/profile/profule.getByFilter';
import { UpdateProfileController } from './application/controllers/profile/profile.update';
import { UpdateProfileUseCase } from './application/useCases/profile/profile.update';
import { ProfileSchema } from './infrastructure/mongo/schemas/profile.schema';
import { EnumProfileRepository } from './domain/profile/profile.enum';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
    ],
    providers: [
        {
            provide: EnumProfileRepository.PROFILE_REPOSITORY,
            useClass: MongoProfileRepository,
        },
        {
            provide: EnumProfileRepository.USER_REPOSITORY,
            useClass: UserRestRepository,
        },
        CreateProfileUseCase,
        GetManyProfileUseCase,
        GetByFilterProfileUseCase,
        UpdateProfileUseCase,
    ],
    controllers: [
        CreateProfileController,
        GetManyProfileController,
        GetByFilterController,
        UpdateProfileController,
    ],
})
export class ProfileModule {}
