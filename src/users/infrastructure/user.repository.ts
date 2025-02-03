import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/user.domain';
import { UserEntity } from './user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async getByEmail(email: string): Promise<User | null> {
        try {
            const user = await this.userRepository
                .createQueryBuilder('user')
                .where('user.email = :email', { email })
                .getOne();

            return user ? this.toDomain(user) : null;
        } catch (err) {
            throw new Error(`Failed to fetch user by email: ${(err as Error).message}`);
        }
    }

    async getById(id: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            return user ? this.toDomain(user) : null;
        } catch (err) {
            throw new Error(`Failed to fetch user by email: ${(err as Error).message}`);
        }
    }

    async getByIds(ids: string[]): Promise<User[]> {
        try {
            const users = await this.userRepository.find({ where: { id: In(ids) } });
            return users ? users.map((user) => this.toDomain(user)) : [];
        } catch (err) {
            throw new Error(`Failed to fetch users by ids: ${(err as Error).message}`);
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

    async save(user: User): Promise<null | Error> {
        try {
            const userRepository = this.fromDomain(user);
            await this.userRepository.save(userRepository);
            return null;
        } catch (err) {
            throw new Error(`Failed to save user: ${(err as Error).message}`);
        }
    }

    private toDomain(user: UserEntity): User {
        try {
            return new User(
                user.id,
                user.last_name,
                user.first_name,
                user.email,
                user.created_at,
                user.updated_at,
            );
        } catch (err) {
            throw new Error(`Failed to map entity to domain: ${(err as Error).message}`);
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
                created_at: user.createdAt,
                updated_at: user.updatedAt,
            };
        } catch (err) {
            throw new Error(`Failed to map domain to entity: ${(err as Error).message}`);
        }
    }
}
