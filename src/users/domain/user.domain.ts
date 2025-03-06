export interface UserRepository {
    get(id: string): User;
}
export class User {
    id: string | null;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string | null,
        firstName: string,
        lastName: string,
        password: string,
        email: string,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    changeEmail(email: string): void {
        this.email = email;
        this.update();
    }

    changePassword(password: string): void {
        this.password = password;
        this.update();
    }

    private update(): void {
        this.updatedAt = new Date();
    }
}
