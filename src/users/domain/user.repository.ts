import { User } from './user.domain';
import { CreateUserInput } from './users.dto';

export interface IUserRepository {
    getByEmail(email: string): Promise<User>;
    getById(id: string): Promise<User>;
    create(input: CreateUserInput): Promise<User>;
    getAll(): Promise<User[]>;
    getByIds(ids: string[]): Promise<User[]>;
}
