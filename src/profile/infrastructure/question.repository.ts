import { Injectable } from '@nestjs/common';

import {
    FilterQuestions,
    IQuestionRepository,
} from '../domain/questions/question.repository';
import { QuestionPostgreRepository } from './postgre/questions/question.postgre.repository';
import { Question } from '../domain/questions/questions.domain';
import { CreateQuestionsInput } from '../domain/questions/questions.dto';

@Injectable()
export class QuestionRepositoryService implements IQuestionRepository {
    constructor(private readonly questionRepository: QuestionPostgreRepository) {}

    async createMany(input: CreateQuestionsInput): Promise<Question[]> {
        const questions = await this.questionRepository.save(input);

        return questions;
    }

    async getMany(input: FilterQuestions): Promise<Question[]> {
        const questions = await this.questionRepository.getMany(input);
        return questions;
    }
}
