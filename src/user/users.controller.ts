import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

import { UserService } from './users.service';
import { UserRegistrationDto } from './users.types';

@Controller('user')
export class UserController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('registration')
    async registrationUser(@Body() body: UserRegistrationDto) {
        return this.userService.registrationUser(body);
    }
}
