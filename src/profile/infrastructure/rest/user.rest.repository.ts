import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { IUser, IUserRepository } from 'src/profile/domain/user/user.domain';

@Injectable()
export class UserRestRepository implements IUserRepository {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    getUrl(): string {
        return this.configService.get<string>('USER_URL') as string;
    }

    async getUserById(id: string): Promise<IUser> {
        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.getUrl()}/users/id/${id}`),
            );
            return response.data;
        } catch (err) {
            throw new NotFoundException(`Failed to get user: ${(err as Error).message}`);
        }
    }
}
