import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { AppLogger } from 'src/shared/logger/logger.service';
import { User } from 'src/users/domain/user.domain';
import { IUserRepository } from 'src/users/domain/user.repository';
import { EnumUserRepository } from 'src/users/domain/user.types';

@Injectable()
export class GetManyUsersUseCase {
    private readonly logger: AppLogger = new AppLogger().withCtx(
        GetManyUsersUseCase.name,
    );

    constructor(
        @Inject(EnumUserRepository.USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
    ) {}

    async exec(ids: string[]): Promise<User[]> {
        const users = await this.userRepository.getByIds(ids);

        if (users.length === 0) {
            this.logger.error(`Users don't exist`);
            throw new NotFoundException(`Users don't exist`);
        }
        return users;
    }
}
