import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {AppService} from './app.service';
import { UsersModule } from './users/users.module';
import {ConfigService} from './config/config.service';
import {ConfigModule} from './config/config.module';
import { AuthModule } from './auth/auth.module';
import {CategoryModule} from './categories/categories.module';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => await configService.getMongoConfig(),
        }),
        UsersModule,
        AuthModule,
        CategoryModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
