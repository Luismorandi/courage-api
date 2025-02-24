import { Body, Controller, Post } from '@nestjs/common';
import { GetQuestionsInput } from 'src/profile/domain/questions/questions.dto';
import { Question } from 'src/profile/domain/questions/questions.domain';
import { GetManyQuestionsUseCase } from '../../useCases/questions/question.getMany';

@Controller('question/get-many')
export class GetManyQuestionsController {
    constructor(private readonly getManyQuestionUseCase: GetManyQuestionsUseCase) {}

    @Post('')
    async getManyQuestions(@Body() input: GetQuestionsInput): Promise<Question[]> {
        const questions = await this.getManyQuestionUseCase.exec(input);
        return questions;
    }
}
