import { Body, Controller, Post } from '@nestjs/common';
import { Match } from '../../domain/match/match.domain';
import { CreateMatchUseCase } from '../useCases/match.create';
import { CreateMatchInput } from 'src/match/domain/match.dto';

@Controller('match/create')
export class CreateMatchController {
    constructor(private readonly match: CreateMatchUseCase) {}

    @Post('')
    async createMatch(@Body() input: CreateMatchInput): Promise<Match> {
        const newMatch = await this.match.create(input);
        return newMatch;
    }
}
