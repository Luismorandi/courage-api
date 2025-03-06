import { User } from './user.domain';

export interface IUserRepository {
    getByEmail(email: string): Promise<User>;
}
