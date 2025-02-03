import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HttpModule } from '@nestjs/axios';
import { MatchEntity } from './infrastructure/match.entity';
import { CreateMatchUseCase } from './application/useCases/match.create';
import { MatchPostgreRepository } from './infrastructure/match.postgre.repository';
import { CreateMatchController } from './application/controllers/match.create';
import { ProfileRestRepository } from './infrastructure/rest/profile.rest.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([MatchEntity]),
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
    ],
    providers: [CreateMatchUseCase, MatchPostgreRepository, ProfileRestRepository],
    controllers: [CreateMatchController],
})
export class MatchModule {}
