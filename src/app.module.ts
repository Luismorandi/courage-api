import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/infrastructure/user.entity';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { ProfileModule } from './profile/profile.module';
import { MatchEntity } from './match/infrastructure/postgre/match/match.entity';
import { MatchModule } from './match/match.module';
import { MessageEntity } from './chat/infrastructure/postgre/message/message.entity';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        MongooseModule.forRoot(
            process.env.MONGO_URI ||
                'mongodb+srv://<usuario>:<contraseña>@ovwadqn.mongodb.net/NombreDeTuDB?retryWrites=true&w=majority',
        ),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT || '5432', 10),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [UserEntity, MatchEntity, MessageEntity],
            synchronize: true,
        }),
        UsersModule,
        SharedModule,
        ProfileModule,
        MatchModule,
        ChatModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
