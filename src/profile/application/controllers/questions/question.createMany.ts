import { Body, Controller, Post } from '@nestjs/common';
import { CreateQuestionsUseCase } from '../../useCases/questions/question.createMany';
import { CreateQuestionsInput } from 'src/profile/domain/questions/questions.dto';
import { Question } from 'src/profile/domain/questions/questions.domain';

@Controller('question/create-many')
export class CreateManyQuestionsController {
    constructor(private readonly createQuestionUseCase: CreateQuestionsUseCase) {}

    @Post('')
    async createManyQuestions(@Body() input: CreateQuestionsInput): Promise<Question[]> {
        const questions = await this.createQuestionUseCase.exec(input);
        return questions;
    }
}
