import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './shared/filters/filter.exception';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            exceptionFactory: (errors) => {
                const messages = errors.flatMap((err) => {
                    if (err.constraints) {
                        return Object.values(err.constraints);
                    } else {
                        return [`Property ${err.property} is invalid`];
                    }
                });

                return new BadRequestException(messages);
            },
        }),
    );

    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalFilters(new GlobalExceptionFilter());
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
