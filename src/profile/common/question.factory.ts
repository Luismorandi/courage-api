import { Injectable } from '@nestjs/common';
import { CreateProfile } from '../domain/profileInfo/profileInfo.dto';
import { ProfileInfo } from '../domain/profileInfo/profileInfo.domain';
import { ProfileRole } from '../domain/profileInfo/profileInfo.roles';
import { ProfileTypes } from '../domain/profileInfo/profileInfo.types';
import { Gender } from '../domain/profileInfo/profileInfo.gender';
import { ProfileStatus, QuestionStatu } from '../domain/profileInfo/profileInfo.status';
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
