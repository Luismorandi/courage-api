import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../domain/user.domain';
import { CreateUserInput } from '../domain/user.types';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get('email/:email')
    async getUserByEmail(@Param('email') email: string): Promise<User> {
        const response = await this.usersService.get(email);
        if (response instanceof Error) {
            throw new Error(response.message);
        }
        return response;
    }

    @Get('id/:id')
    async getById(@Param('id') id: string): Promise<User> {
        const response = await this.usersService.getById(id);
        if (response instanceof Error) {
            throw new Error(response.message);
        }
        return response;
    }
    @Get('')
    async getAllUsers(): Promise<User[]> {
        const response = await this.usersService.getAll();
        return response;
    }

    @Post('')
    async createUser(@Body() input: CreateUserInput): Promise<User> {
        const newUser = await this.usersService.create(input);
        return newUser;
    }

    @Get('many')
    async getManyUsers(@Query('ids') ids: string): Promise<User[]> {
        const idsToService = ids.split(',');
        const users = await this.usersService.getUsers(idsToService);
        return users;
    }
}
