import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin() {
        // Redirects to Google login
    }

    @Get('google/login/return')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req, @Res() res) {
        const token = req.user.token;
        res.cookie('jwt', token, { httpOnly: true }); 
        return res.redirect(`http://localhost:3000/dashboard`);
    }

    @Get('facebook')
    @UseGuards(AuthGuard('facebook'))
    facebookLogin() {
        // Redirects to Facebook login
    }

    @Get('facebook/login/return')
    @UseGuards(AuthGuard('facebook'))
    facebookAuthRedirect(@Req() req, @Res() res) {
        console.log('[FACEBOOK LOGIN RETURN CALLED ::]')
        const token = req.user.token;
        res.cookie('jwt', token, { httpOnly: true });
        return res.redirect(`http://localhost:3000/dashboard`);
    }

    @Get('token')
    getToken(@Req() req, @Res() res) {
        console.log('[Cookies::]', req.cookies)
        const token = req?.cookies?.jwt; 
        if (token) {
            return res.json({ token });
        } else {
            return res.status(401).json({ message: "No token found" });
        }
    }

    @Get('logout')
    logout(@Res() res: Response) {
        res.clearCookie('jwt', { path: '/' });
        return res.json({ message: "Logged out successfully" });
    }
}
