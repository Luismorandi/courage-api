import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from 'src/shared/logger/logger.service';
import { User } from 'src/users/domain/user.domain';
import { IUserRepository } from 'src/users/domain/user.repository';
import { EnumUserRepository } from 'src/users/domain/user.types';

@Injectable()
export class GetAllUsersUseCase {
    private readonly logger: AppLogger = new AppLogger().withCtx(GetAllUsersUseCase.name);

    constructor(
        @Inject(EnumUserRepository.USER_REPOSITORY)
        private userRepository: IUserRepository,
    ) {}

    async exec(): Promise<User[]> {
        const users = await this.userRepository.getAll();

        if (users.length === 0) {
            this.logger.error(`Users dont exist`);
            throw new NotFoundException(`Users dont exist`);
        }
        return users;
    }
}
