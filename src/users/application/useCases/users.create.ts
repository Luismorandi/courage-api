import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/domain/user.domain';
import { EnumUserRepository, HASH_SALT } from 'src/users/domain/user.types';
import * as bcrypt from 'bcrypt';
import { IProfileRepository, defaultProfile } from 'src/users/domain/profile.domain';
import { IUserRepository } from 'src/users/domain/user.repository';
import { CreateUserInput } from 'src/users/domain/users.dto';

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject(EnumUserRepository.USER_REPOSITORY)
        private userRepository: IUserRepository,
        @Inject(EnumUserRepository.PROFILE_REPOSITORY)
        private profileRepository: IProfileRepository,
    ) {}

    async exec(input: CreateUserInput): Promise<User> {
        const saltRounds = HASH_SALT;
        const hashedPassword = await bcrypt.hash(input.password, saltRounds);

        const newUser = new User(
            null,
            input.firstName,
            input.lastName,
            hashedPassword,
            input.email,
            new Date(),
            new Date(),
        );

        const user = await this.userRepository.create(newUser);
        defaultProfile.firstName = user.firstName;
        defaultProfile.lastName = user.lastName;

        await this.profileRepository.create(defaultProfile, user);

        return newUser;
    }
}
