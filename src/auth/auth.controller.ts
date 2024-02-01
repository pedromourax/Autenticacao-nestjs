import { Controller, HttpCode, HttpStatus, UseGuards, Post, Request, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestBody } from './models/loginRequestBody';
import { AuthGuard } from './guards/auth.guard';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("login")
    @HttpCode(HttpStatus.OK)
    login(@Body() loginDto: LoginRequestBody) {
        return this.authService.login(loginDto.email, loginDto.senha);
    }

    @Get("profile")
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    profile(@Request() req) {
        return this.authService.getProfile(req);
    }
}
