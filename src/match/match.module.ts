import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HttpModule } from '@nestjs/axios';
import { UserRestRepository } from './infrastructure/rest/user.rest.repository';
import { MatchEntity } from './infrastructure/match.entity';
import { CreateMatchUseCase } from './application/useCases/match.create';
import { MatchPostgreRepository } from './infrastructure/match.postgre.repository';
import { CreateMatchController } from './application/controllers/match.create';

@Module({
    imports: [
        TypeOrmModule.forFeature([MatchEntity]),
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
    ],
    providers: [CreateMatchUseCase, MatchPostgreRepository, UserRestRepository],
    controllers: [CreateMatchController],
})
export class MatchModule {}
