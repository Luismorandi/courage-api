import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { IUser, IUserRepository } from 'src/match/domain/user/user.domain';
import { AppLogger } from 'src/shared/logger/logger.service';

@Injectable()
export class UserRestRepository implements IUserRepository {
    private readonly logger: AppLogger = new AppLogger().withCtx(UserRestRepository.name);
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

    async getManyUsers(ids: string[]): Promise<IUser[]> {
        try {
            const idsParams = ids.join(',');

            const response = await firstValueFrom(
                this.httpService.get(`${this.getUrl()}/users/many?ids=${idsParams}`),
            );

            return response.data;
        } catch (err) {
            this.logger.error(`Failed to get user: ${(err as Error).message}`);
            throw new BadRequestException(
                `Failed to get user: ${(err as Error).message}`,
            );
        }
    }
}
