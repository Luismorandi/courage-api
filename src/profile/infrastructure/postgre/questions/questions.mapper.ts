import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Question } from 'src/profile/domain/questions/questions.domain';
import { QuestionsEntity } from './questions.entity';

@Injectable()
export class QuestionsMapper {
    toEntities(questions: Question[]): QuestionsEntity[] {
        if (questions.length > 0) {
            return questions.map((question) => ({
                id: randomUUID(),
                type: question.getType(),
                status: question.getStatus(),
                value: question.getValue(),
            }));
        }
        return [];
    }
}
