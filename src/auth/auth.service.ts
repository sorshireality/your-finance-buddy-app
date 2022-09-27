import {Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {IAuthUser} from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {
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
}
