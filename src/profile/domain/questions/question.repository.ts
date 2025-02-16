import { Question } from './questions.domain';
import { CreateQuestionsInput } from './questions.dto';

export interface IQuestionRepository {
    createMany(input: CreateQuestionsInput): Promise<Question[]>;
}
