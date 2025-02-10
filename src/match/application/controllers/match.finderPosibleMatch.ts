import { Body, Controller, Post } from '@nestjs/common';
import { FinderPosibleMatchInput } from 'src/match/domain/match.dto';
import { FinderPosibleMatchUseCase } from '../useCases/match/match.finder';
import { IProfile } from 'src/match/domain/profile/profile.domain';

@Controller('match/finder')
export class FinderPosibleMatchController {
    constructor(private readonly finder: FinderPosibleMatchUseCase) {}

    @Post('')
    async createMatch(@Body() input: FinderPosibleMatchInput): Promise<IProfile[]> {
        const newMatch = await this.finder.exec(input.arg, input.finderName);
        return newMatch;
    }
}
