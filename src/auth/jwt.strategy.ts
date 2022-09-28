import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Inject, Injectable} from '@nestjs/common';
import {IJwtConfig} from '../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject('JWT_CONFIG') jwtConfig: IJwtConfig) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfig.secret,
        });
    }

    validate(payload: { email: string, [propName: string]: any; }) {
        return { email: payload.email };
    }
}
