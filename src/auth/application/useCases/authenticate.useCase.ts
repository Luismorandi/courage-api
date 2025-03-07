import {
    ConflictException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from 'src/auth/domain/user.domain';
import { EnumAuthRepository } from 'src/auth/domain/auth.enum';
export type AuthInput = { username: string; password: string };
export type SingInData = { userId: string; username: string };
export type AuthResult = { access_token: string; userId: string; username: string };

@Injectable()
export class AuthenticateUseCase {
    constructor(
        @Inject(EnumAuthRepository.USER_REPOSITORY)
        private userRepository: IUserRepository,
        private readonly jwtService: JwtService,
    ) {}

    async authenticate(input: AuthInput): Promise<AuthResult> {
        const user = await this.validateUser(input);
        if (!user) {
            throw new UnauthorizedException(`Can't authenticate user ${input.username}`);
        }

        return this.signIn(user);
    }

    private async validateUser(input: AuthInput): Promise<SingInData | null> {
        const user = await this.userRepository.getUserByEmail(input.username);
        if (user instanceof Error) {
            throw new ConflictException('Error while get user');
        }

        let isMatch: boolean = false;
        if (user) {
            isMatch = await bcrypt.compare(input.password, user.password);
            if (!isMatch) {
                throw new UnauthorizedException('Invalid credentials');
            }
            return {
                userId: user.id ?? '',
                username: user.email,
            };
        }
        return null;
    }

    private async signIn(userInfo: SingInData) {
        const tokenPayload = {
            sub: userInfo.userId,
            username: userInfo.username,
        };

        const accessToken = await this.jwtService.signAsync(tokenPayload);
        return {
            userId: userInfo.userId,
            username: userInfo.username,
            access_token: accessToken,
        };
    }
}
