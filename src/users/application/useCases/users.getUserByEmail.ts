import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from 'src/shared/logger/logger.service';
import { User } from 'src/users/domain/user.domain';
import { IUserRepository } from 'src/users/domain/user.repository';
import { EnumUserRepository } from 'src/users/domain/user.types';

@Injectable()
export class GetUserByEmailUseCase {
    private readonly logger: AppLogger = new AppLogger().withCtx(
        GetUserByEmailUseCase.name,
    );

    constructor(
        @Inject(EnumUserRepository.USER_REPOSITORY)
        private userRepository: IUserRepository,
    ) {}

    async exec(email: string): Promise<User> {
        const user = await this.userRepository.getByEmail(email);

        if (!user) {
            this.logger.error(`User with email ${email} dont exist.`);
            throw new NotFoundException(`User with email ${email} dont exist.`);
        }
        return user;
    }
}
