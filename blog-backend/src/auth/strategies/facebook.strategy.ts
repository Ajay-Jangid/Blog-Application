import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor(private authService: AuthService) {
        super({
            clientID: "9389776957807417",
            clientSecret: "77a4a63488078608ae62fc86a04c63a7",
            callbackURL: 'http://localhost:8082/auth/facebook/login/return',
            profileFields: ['id', 'displayName', 'emails'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
        console.log('[USER PROFILE :::]', profile)
        const user = {
            name: profile.displayName,
            provider: profile.provider,
        };

        const token = await this.authService.generateJwt(user);
        return done(null, { user, token });
    }
}
