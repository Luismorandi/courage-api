import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EnumProfileRepository } from 'src/profile/domain/profile/profile.enum';
import { AppLogger } from 'src/shared/logger/logger.service';
import { User } from 'src/users/domain/user.domain';
import { IUserRepository } from 'src/users/domain/user.repository';

@Injectable()
export class GetUserByIdUseCase {
    private readonly logger: AppLogger = new AppLogger().withCtx(GetUserByIdUseCase.name);

    constructor(
        @Inject(EnumProfileRepository.USER_REPOSITORY)
        private userRepository: IUserRepository,
    ) {}

    async exec(id: string): Promise<User> {
        const user = await this.userRepository.getById(id);

        if (!user) {
            this.logger.error(`User with id ${id} dont exist.`);
            throw new NotFoundException(`User with id ${id} dont exist.`);
        }
        return user;
    }
}
