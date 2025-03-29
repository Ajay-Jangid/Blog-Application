import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private authService: AuthService) {
        super({
            clientID: "377765816065-ov4ntkor7fpuftinnfktvr0p2cqi8j12.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: 'http://localhost:8082/auth/google/login/return',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
        const user = {
            email: profile.emails[0].value,
            name: profile.displayName,
            provider: profile.provider,
        };

        console.log('[USER PROFILE :::]', user)

        const token = await this.authService.generateJwt(user);
        return done(null, { user, token });
    }
}
