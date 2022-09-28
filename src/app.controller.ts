import {Controller, Request, Post, UseGuards, Get} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {AuthService} from './auth/auth.service';
import {User} from './users/schemas/user.schema';
import {AppService} from './app.service';

@Controller()
export class AppController {
    constructor(
        private authService: AuthService,
        private appService: AppService
    ) {
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req: { user: User }) {
         return this.authService.login(req.user);
    }

    @Get()
    hello(){
        return this.appService.getHello()
    }
}
