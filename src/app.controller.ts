import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {

    // eslint-disable-next-line @typescript-eslint/require-await
    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
        return req.user;
    }
}
