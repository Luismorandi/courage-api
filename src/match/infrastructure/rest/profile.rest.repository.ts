import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { IProfile } from 'src/match/domain/profile/profile.domain';
import { IProfileRepository } from 'src/match/domain/profile/profile.repository';
import { AppLogger } from 'src/shared/logger/logger.service';

@Injectable()
export class ProfileRestRepository implements IProfileRepository {
    private readonly logger: AppLogger = new AppLogger().withCtx(
        ProfileRestRepository.name,
    );
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    getUrl(): string {
        return this.configService.get<string>('PROFILE_URL') as string;
    }

    async getManyProfiles(ids: string[]): Promise<IProfile[]> {
        try {
            const idsParams = ids.join(',');

            const response = await firstValueFrom(
                this.httpService.get(`${this.getUrl()}/profile/many?ids=${idsParams}`),
            );

            return response.data;
        } catch (err) {
            this.logger.error(`Failed to get profiles: ${(err as Error).message}`);
            throw new BadRequestException(
                `Failed to get profiles: ${(err as Error).message}`,
            );
        }
    }
}
