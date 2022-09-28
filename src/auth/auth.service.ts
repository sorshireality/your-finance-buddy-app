import {Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {IAuthUser, User} from '../users/schemas/user.schema';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async validateUser(email: string, pass: string): Promise<IAuthUser> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && user.password === pass) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    login(user: User) {
        const payload = {username: user.email, sub: user.firstName + user.lastName}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
