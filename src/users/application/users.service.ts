import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '../domain/user.domain';
import { CreateUserInput } from '../domain/user.types';
import { UserRepository } from '../infrastructure/user.repository';
import { AppLogger } from 'src/shared/logger/logger.service';

@Injectable()
export class UsersService {
    private readonly logger: AppLogger= new AppLogger().withCtx(UsersService.name)
    constructor(private readonly userRepository: UserRepository, 
    ) {
    }


    async create(input: CreateUserInput): Promise<User> {
            const email = input.email.toLowerCase();
            const existingUser = await this.userRepository.getByEmail(email);
    
            if (existingUser) {
                this.logger.error(`User with email ${email} already exists.`);  
                throw new ConflictException('User with this email already exists'); 
            }
    
            const newUser = new User(
                null, 
                input.firstName,
                input.lastName,
                email,
                new Date(), 
                new Date()  
            );
    
            await this.userRepository.save(newUser);
    
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

    async getAll(): Promise<User[] > {
        const users = await this.userRepository.getUsersWithCustomFilter(null);

        if (users.length === 0) {
            this.logger.error(`Not found users `);
            throw new Error(`Not found users `);
        }

        return users;
}
}
