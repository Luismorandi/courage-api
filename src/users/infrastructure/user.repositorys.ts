import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AppLogger } from 'src/shared/logger/logger.service';
import { IUserRepository } from '../domain/user.repository';
import { User } from '../domain/user.domain';

@Injectable()
export class UserRepositoryService implements IUserRepository {
    private readonly logger: AppLogger = new AppLogger().withCtx(
        UserRepositoryService.name,
    );
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,
    ) {}

    async getByEmail(email: string): Promise<User> {
        try {
            const user = await this.userRepository.getByEmail(email);
            return user;
        } catch (err) {
            this.logger.error('Error getting user by email - repository');
            throw new InternalServerErrorException('Failed to get user.');
        }
    }
}
