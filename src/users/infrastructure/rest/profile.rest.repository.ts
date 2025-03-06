import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateProfileInput, IProfileRepository } from 'src/users/domain/profile.domain';
import { User } from 'src/users/domain/user.domain';

@Injectable()
export class ProfileRestRepository implements IProfileRepository {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    getUrl(): string {
        return this.configService.get<string>('PROFILE_URL') as string;
    }

    async create(input: CreateProfileInput, user: User): Promise<void> {
        try {
            if (!user.id) {
                throw new Error('User id is required');
            }
            input.userId = user.id;
            const response = await firstValueFrom(
                this.httpService.post(`${this.getUrl()}/profile/create`, input),
            );
            return response.data;
        } catch (err) {
            throw new NotFoundException(
                `Failed to create profile: ${(err as Error).message}`,
            );
        }
    }
}
