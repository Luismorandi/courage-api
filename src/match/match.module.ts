import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HttpModule } from '@nestjs/axios';
import { MatchEntity } from './infrastructure/postgre/match/match.entity';
import { CreateMatchUseCase } from './application/useCases/match/match.create';
import { MatchPostgreRepository } from './infrastructure/postgre/match/match.postgre.repository';
import { CreateMatchController } from './application/controllers/match.create';
import { ProfileRestRepository } from './infrastructure/rest/profile.rest.repository';
import { FinderPosibleMatchUseCase } from './application/useCases/match/match.finder';
import { FinderPosibleMatchController } from './application/controllers/match.finderPosibleMatch';
import { AI } from './infrastructure/rest/ai.rest.respository';

@Module({
    imports: [
        TypeOrmModule.forFeature([MatchEntity]),
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
    ],
    providers: [
        CreateMatchUseCase,
        FinderPosibleMatchUseCase,
        MatchPostgreRepository,
        ProfileRestRepository,
        AI,
    ],
    controllers: [CreateMatchController, FinderPosibleMatchController],
})
export class MatchModule {}
