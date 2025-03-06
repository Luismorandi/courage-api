import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../domain/user.domain';
import { CreateUserInput, HASH_SALT } from '../domain/user.types';
import { UserRepository } from '../infrastructure/postgre/user.repository';
import { AppLogger } from 'src/shared/logger/logger.service';
import * as bcrypt from 'bcrypt';
import { ProfileRestRepository } from '../infrastructure/rest/profile.rest.repository';
import { defaultProfile } from '../domain/profile.domain';

@Injectable()
export class UsersService {
    private readonly logger: AppLogger = new AppLogger().withCtx(UsersService.name);
    constructor(
        private readonly userRepository: UserRepository,
        private readonly profileRepository: ProfileRestRepository,
    ) {}

    async create(input: CreateUserInput): Promise<User> {
        const email = input.email.toLowerCase();
        const existingUser = await this.userRepository.getByEmail(email);
        if (existingUser) {
            throw new ConflictException('El usuario ya existe');
        }
        const saltRounds = HASH_SALT;
        const hashedPassword = await bcrypt.hash(input.password, saltRounds);

        if (existingUser) {
            this.logger.error(`User with email ${email} already exists.`);
            throw new ConflictException('User with this email already exists');
        }

        const newUser = new User(
            null,
            input.firstName,
            input.lastName,
            hashedPassword,
            email,
            new Date(),
            new Date(),
        );

        const user = await this.userRepository.save(newUser);
        defaultProfile.firstName = user.firstName;
        defaultProfile.lastName = user.lastName;

        await this.profileRepository.create(defaultProfile, user);

        return newUser;
    }

    async get(email: string): Promise<User | Error> {
        const user = await this.userRepository.getByEmail(email);

        if (!user) {
            this.logger.error(`User with email ${email} dont exist.`);
            throw new Error(`User with email ${email} dont exist.`);
        }

        await this.userRepository.save(user);

        return user;
    }

    async getById(id: string): Promise<User | Error> {
        const user = await this.userRepository.getById(id);

        if (!user) {
            this.logger.error(`User with id ${id} dont exist.`);
            throw new NotFoundException(`User with id ${id} dont exist.`);
        }

        return user;
    }

    async getUsers(ids: string[]): Promise<User[]> {
        const users = await this.userRepository.getByIds(ids);
        if (Array.isArray(users) && users.length === 0) {
            this.logger.error(`Users with id ${ids} dont exist.`);
            throw new NotFoundException(`User with id ${ids} dont exist.`);
        }
        return users;
    }

    async getAll(): Promise<User[]> {
        const users = await this.userRepository.getUsersWithCustomFilter(null);

        if (users.length === 0) {
            this.logger.error(`Not found users `);
            throw new Error(`Not found users `);
        }

        return users;
    }
}
