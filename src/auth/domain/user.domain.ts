export interface IUserRepository {
    getUserByEmail(email: string): Promise<IUser>;
}

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
