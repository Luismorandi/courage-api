export interface IUser{
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    createdAt: Date,
    updatedAt: Date

}

export interface IUserRepository{
   getUserById(id: string): Promise<IUser>

}