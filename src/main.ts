import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './shared/filters/filter.exception';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true, // Transforma el objeto a una instancia de la clase
            whitelist: true, // Elimina propiedades no definidas en el DTO
            forbidNonWhitelisted: true, // Lanza un error si hay propiedades no permitidas
            exceptionFactory: (errors) => {
                // Aseguramos que 'errors' sea un array de objetos que tengan la propiedad 'constraints'
                const messages = errors.flatMap((err) => {
                    if (err.constraints) {
                        return Object.values(err.constraints); // Obtener los mensajes de las restricciones falladas
                    } else {
                        return [`Property ${err.property} is invalid`]; // Mensaje por defecto si no hay 'constraints'
                    }
                });

                // Retornamos una excepción con todos los mensajes de error
                return new BadRequestException(messages);
            },
        }),
    );

    app.enableCors({
        origin: '*', // o un array de orígenes permitidos
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalFilters(new GlobalExceptionFilter());
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
