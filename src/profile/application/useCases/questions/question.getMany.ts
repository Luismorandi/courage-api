import { Injectable } from '@nestjs/common';
import { Details } from 'src/profile/domain/profileDetails/details';
import { FilterQuestions } from 'src/profile/domain/questions/question.repository';

import { Question } from 'src/profile/domain/questions/questions.domain';
import { GetQuestionsInput } from 'src/profile/domain/questions/questions.dto';
import { QuestionRepositoryService } from 'src/profile/infrastructure/question.repository';

@Injectable()
export class GetManyQuestionsUseCase {
    constructor(private readonly questionRepository: QuestionRepositoryService) {}

    async exec(input: GetQuestionsInput): Promise<Question[]> {
        let filter: FilterQuestions = {};
        if (!input?.types || input?.types.length === 0) {
            filter = {
                type: [
                    Details.BIO,
                    Details.HEALTHY,
                    Details.JOKE,
                    Details.VULNERABILITY,
                    Details.RELATION_TIME,
                ],
            };
        } else {
            filter = { type: input.types };
        }
        const questions = await this.questionRepository.getMany(filter);
        return questions;
    }
}
