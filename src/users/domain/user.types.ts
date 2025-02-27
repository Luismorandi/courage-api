export interface CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const HASH_SALT = process.env.HASH_SALT ?? 10;
