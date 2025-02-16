import { InjectRepository } from '@nestjs/typeorm';
import { QuestionsEntity } from './questions.entity';
import { Repository } from 'typeorm';
import { QuestionsMapper } from './questions.mapper';
import { CreateQuestionsInput } from 'src/profile/domain/questions/questions.dto';
import { Question } from 'src/profile/domain/questions/questions.domain';

export class QuestionPostgreRepository {
    constructor(
        @InjectRepository(QuestionsEntity)
        private readonly questionRepository: Repository<QuestionsEntity>,
        private readonly questionMapper: QuestionsMapper,
    ) {}

    async save(input: CreateQuestionsInput): Promise<Question[]> {
        try {
            if (!input.questions) {
                throw new Error('Questions input must contain questions');
            }
            const questionToEntities = input.questions.map((e) =>
                this.questionMapper.createQuestionToEntity(e),
            );
            const questionEntities =
                await this.questionRepository.save(questionToEntities);
            return questionEntities.map((e) => this.questionMapper.toDomain(e));
        } catch (err) {
            throw new Error(`Failed to save questions: ${(err as Error).message}`);
        }
    }
}
