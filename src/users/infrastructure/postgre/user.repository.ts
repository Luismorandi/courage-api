import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/user.domain';
import { UserEntity } from './user.entity';
import { randomUUID } from 'crypto';
import { AppLogger } from 'src/shared/logger/logger.service';
import { IUserRepository } from 'src/users/domain/user.repository';
import { uuid } from 'uuidv4';
import { CreateUserInput } from 'src/users/domain/users.dto';

@Injectable()
export class UserRepository implements IUserRepository {
    private readonly logger: AppLogger = new AppLogger().withCtx(UserRepository.name);
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async getByEmail(email: string): Promise<User> {
        try {
            const userEntity = await this.userRepository
                .createQueryBuilder('user')
                .where('user.email = :email', { email })
                .getOne();
            if (!userEntity) {
                throw new NotFoundException(`User ${email} not found`);
            }
            const user = this.toDomain(userEntity);
            return user;
        } catch (err) {
            this.logger.error(
                'Error getting user by email - repository',
                `${(err as Error).message}`,
            );
            throw new InternalServerErrorException('Failed to get user by email.');
        }
    }

    async getById(id: string): Promise<User> {
        try {
            const userEntity = await this.userRepository.findOne({ where: { id } });
            if (!userEntity) {
                throw new NotFoundException(`User ${id} not found`);
            }
            const user = this.toDomain(userEntity);
            return user;
        } catch (err) {
            this.logger.error(
                'Error getting user by id  - repository',
                `${(err as Error).message}`,
            );
            throw new InternalServerErrorException('Failed to get user by id.');
        }
    }

    async create(input: CreateUserInput): Promise<User> {
        try {
            const userEntity = await this.userRepository
                .createQueryBuilder('user')
                .where('user.email = :email', { email: input.email })
                .getOne();

            if (userEntity) {
                this.logger.error(`User with email ${input.email} already exists.`);
                throw new ConflictException('User with this email already exists');
            }
            const user = this.createUser(input);
            const userRepository = this.fromDomain(user);
            const newUser = await this.userRepository.save(userRepository);

            return this.toDomain(newUser);
        } catch (err) {
            this.logger.error(
                'Error creating user - repository',
                `${(err as Error).message}`,
            );
            throw new InternalServerErrorException('Failed to create user.');
        }
    }

    async getAll(): Promise<User[]> {
        try {
            const users = await this.userRepository.find();
            return users ? users.map((user) => this.toDomain(user)) : [];
        } catch (err) {
            this.logger.error(
                'Error getting all users  - repository',
                `${(err as Error).message}`,
            );
            throw new InternalServerErrorException('Failed to get all users.');
        }
    }

    async getByIds(ids: string[]): Promise<User[]> {
        try {
            const users = await this.userRepository.find({ where: { id: In(ids) } });
            return users ? users.map((user) => this.toDomain(user)) : [];
        } catch (err) {
            this.logger.error(
                'Error getting all users  - repository',
                `${(err as Error).message}`,
            );
            throw new InternalServerErrorException('Failed to get all users.');
        }
    }

    async getUsersWithCustomFilter(filters: any): Promise<User[]> {
        try {
            const queryBuilder = this.userRepository.createQueryBuilder('user_entity');

            if (filters?.name) {
                queryBuilder.andWhere('user_entity.name LIKE :name', {
                    name: `%${filters.name}%`,
                });
            }

            if (filters?.email) {
                queryBuilder.andWhere('user_entity.email LIKE :email', {
                    email: `%${filters.email}%`,
                });
            }

            const users = await queryBuilder.getMany();
            return users.map((user) => this.toDomain(user));
        } catch (err) {
            throw new Error(
                `Failed to fetch users with filters: ${(err as Error).message}`,
            );
        }
    }

    private toDomain(user: UserEntity): User {
        try {
            return new User(
                user.id,
                user.first_name,
                user.last_name,
                user.password,
                user.email,
                user.created_at,
                user.updated_at,
            );
        } catch (err) {
            throw new Error(`Failed to map entity to domain: ${(err as Error).message}`);
        }
    }

    private createUser(input: CreateUserInput): User {
        try {
            return new User(
                uuid(),
                input.firstName,
                input.lastName,
                input.password,
                input.email,
                new Date(),
                new Date(),
            );
        } catch (err) {
            throw new Error(`Failed to create user class: ${(err as Error).message}`);
        }
    }

    private fromDomain(user: User): UserEntity {
        try {
            const id = user.id ? user.id : randomUUID();
            return {
                id: id,
                email: user.email,
                first_name: user.firstName,
                last_name: user.lastName,
                password: user.password,
                created_at: user.createdAt,
                updated_at: user.updatedAt,
            };
        } catch (err) {
            throw new Error(`Failed to map domain to entity: ${(err as Error).message}`);
        }
    }
}
