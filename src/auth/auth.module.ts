import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from '../users/users.module';
import {LocalStrategy} from './local.strategy';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {ConfigService} from '../config/config.service';
import {ConfigModule} from '../config/config.module';
import {JwtStrategy} from './jwt.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        ConfigModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => await config.getJwtConfig()
        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, {
        provide: 'JWT_CONFIG',
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => await config.getJwtConfig()
    }],
    exports: [AuthService]
})
export class AuthModule {
}
