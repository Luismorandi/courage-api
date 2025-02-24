import { Details } from '../profileDetails/details';
import { QuestionStatu } from '../profileInfo/profileInfo.status';
import { Question } from './questions.domain';
import { CreateQuestionsInput } from './questions.dto';

export interface IQuestionRepository {
    createMany(input: CreateQuestionsInput): Promise<Question[]>;
    getMany(input: FilterQuestions): Promise<Question[]>;
}

export interface FilterQuestions {
    type?: Details[];
    value?: string;
    status?: QuestionStatu;
}
