import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {AuthService} from './auth/auth.service';
import {User} from './users/schemas/user.schema';

@Controller()
export class AppController {
    constructor(private authService: AuthService) {
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req: { user: User }) {
         return this.authService.login(req.user);
    }
}
