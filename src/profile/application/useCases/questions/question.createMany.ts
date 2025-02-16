import { Injectable } from '@nestjs/common';

import { Question } from 'src/profile/domain/questions/questions.domain';
import { CreateQuestionsInput } from 'src/profile/domain/questions/questions.dto';
import { QuestionRepositoryService } from 'src/profile/infrastructure/question.repository';

@Injectable()
export class CreateQuestionsUseCase {
    constructor(private readonly questionRepository: QuestionRepositoryService) {}

    async exec(input: CreateQuestionsInput): Promise<Question[]> {
        const questions = await this.questionRepository.createMany(input);
        return questions;
    }
}
