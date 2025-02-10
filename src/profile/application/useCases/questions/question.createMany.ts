// import { Injectable } from '@nestjs/common';
// import { AppLogger } from 'src/shared/logger/logger.service';

// import { ProfilePostgreRepository } from 'src/profile/infrastructure/postgre/profile/profile.postgre.repository';
// import { Question } from 'src/profile/domain/questions/questions.domain';
// import { CreateQuestionsInput } from 'src/profile/domain/profile/profile.dto';

// @Injectable()
// export class CreateQuestionsUseCase {
//     private readonly logger: AppLogger = new AppLogger().withCtx(
//         CreateQuestionsUseCase.name,
//     );
//     constructor(private readonly profileRepository: ProfilePostgreRepository) {}

//     async exec(input: CreateQuestionsInput): Promise<Question[]> {

//         const questions = await this.profileRepository.

//         return profiles;
//     }
// }
