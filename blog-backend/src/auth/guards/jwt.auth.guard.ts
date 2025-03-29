import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private authService: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = request.cookies['jwt'];

        if (!token) return false;

        try {
            request['user'] = await this.authService.verifyJwtToken(token);
            return true;
        } catch (err) {
            console.log('[err;]', err)
            return false;
        }
    }
}
