import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { TOKEN } from './token';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers[TOKEN];
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const tokenPayload = await this.jwtService.verifyAsync(token);
            request.user = {
                userId: tokenPayload.sub,
                username: tokenPayload.username,
            };
        } catch (e) {
            throw new UnauthorizedException();
        }
        return true;
    }
}
