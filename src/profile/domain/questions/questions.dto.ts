import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Details } from '../profileDetails/details';
import { QuestionStatu } from '../profileInfo/profileInfo.status';

export class CreateQuestionsInput {
    questions: CreateQuestionInput[];
}

export class CreateQuestionInput {
    @IsEnum(Details, { message: 'Invalid type' })
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    value: string;
}

export class CreateQuestion {
    @IsString()
    id: string;
    @IsEnum(Details, { message: 'Invalid type' })
    @IsNotEmpty()
    type: string;

    @IsEnum(QuestionStatu, { message: 'Invalid status' })
    status: string;

    @IsString()
    @IsNotEmpty()
    value: string;

    @IsNotEmpty()
    createdAt: Date;
    @IsNotEmpty()
    updatedAt: Date;
}
