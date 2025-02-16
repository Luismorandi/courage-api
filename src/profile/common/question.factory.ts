import { Injectable } from '@nestjs/common';
import { QuestionStatu } from '../domain/profileInfo/profileInfo.status';
import { CreateQuestion } from '../domain/questions/questions.dto';
import { Question } from '../domain/questions/questions.domain';
import { Details } from '../domain/profileDetails/details';

@Injectable()
export class QuestionFactory {
    createQuestion(input: CreateQuestion): Question {
        return new Question(
            input.id,
            input.value,
            input.type as Details,
            input.status as QuestionStatu,
            input.createdAt,
            input.updatedAt,
        );
    }
}
