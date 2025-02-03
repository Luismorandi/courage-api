import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { AppLogger } from '../logger/logger.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const logger = new AppLogger();

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (exception instanceof HttpException) {
            const exepctionB: any = exception;
            return response.status(exception.getStatus()).json({
                statusCode: exception.getStatus(),
                message: exepctionB?.response.message ?? exception.message,
            });
        }

        logger.error(`Unexpected error`);
        return response.status(500).json({
            statusCode: 500,
            message: 'Unexpected error occurred',
        });
    }
}
