import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/infrastructure/user.entity';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { ProfileModule } from './profile/profile.module';
import { ProfileEntity } from './profile/infrastructure/postgre/profile/profile.entity';
import { MatchEntity } from './match/infrastructure/postgre/match/match.entity';
import { MatchModule } from './match/match.module';
import { ProfileDetailsEntity } from './profile/infrastructure/postgre/profileDetails/profileDetails.entity';
import { ProfilePhotosEntity } from './profile/infrastructure/postgre/profilePhotos/profilePhotos.entity';
import { MessageEntity } from './chat/infrastructure/postgre/message/message.entity';
import { ChatModule } from './chat/chat.module';
import { QuestionsEntity } from './profile/infrastructure/postgre/questions/questions.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Esto hace que las variables de entorno estén disponibles globalmente
            envFilePath: '.env', // Ruta del archivo .env
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT || '5432', 10),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [
                UserEntity,
                ProfileEntity,
                MatchEntity,
                ProfileDetailsEntity,
                ProfilePhotosEntity,
                MessageEntity,
                QuestionsEntity,
            ],
            synchronize: true,
        }),
        UsersModule,
        SharedModule,
        ProfileModule,
        MatchModule,
        ChatModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
