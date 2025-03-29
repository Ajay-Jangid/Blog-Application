import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async generateJwt(user: any) {
        try {
            const payload = { email: user.email, sub: user.id, provider: user.provider };
            return this.jwtService.sign(payload, { secret: "abcd@1234" });
        } catch (err) {
            console.log('[ERROR GENERATE JWT ::]', err);
        }
    }

    async verifyJwtToken(token: any) {
        try {
            const result = await this.jwtService.verify(token, { secret: "abcd@1234" });
            console.log('[VERIFY JWT ::]', result)
            return result
        } catch (err) {
            console.log('[ERROR verifyJwtToken ::]', err);
        }
    }
}
