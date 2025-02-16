import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Question } from 'src/profile/domain/questions/questions.domain';
import { QuestionsEntity } from './questions.entity';
import { CreateQuestionInput } from 'src/profile/domain/questions/questions.dto';
import { QuestionStatu } from 'src/profile/domain/profileInfo/profileInfo.status';
import { Details } from 'src/profile/domain/profileDetails/details';

@Injectable()
export class QuestionsMapper {
    toEntities(questions: Question[]): QuestionsEntity[] {
        if (questions.length > 0) {
            return questions.map((question) => ({
                id: question.getId(),
                type: question.getType(),
                status: question.getStatus(),
                value: question.getValue(),
                created_at: question.getCreatedAt(),
                updated_at: question.getUpdatedAt(),
            }));
        }
        return [];
    }

    toDomain(question: QuestionsEntity): Question {
        return new Question(
            question.id,
            question.value,
            question.type as Details,
            question.status as QuestionStatu,
            question.created_at,
            question.updated_at,
        );
    }

    createQuestionToEntity(input: CreateQuestionInput): QuestionsEntity {
        return {
            id: randomUUID(),
            type: input.type,
            value: input.value,
            status: QuestionStatu.ACTIVE,
            created_at: new Date(),
            updated_at: new Date(),
        };
    }
}
