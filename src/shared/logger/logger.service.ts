import { Injectable, Logger } from '@nestjs/common';
@Injectable()
export class AppLogger {
    private context: string;
    private readonly logger: Logger;

    constructor() {
        this.context = 'AppLoger';
        this.logger = new Logger(this.context);
    }

    private formatLog(level: string, message: string, trace?: string) {
        const log = {
            level,
            message,
            timestamp: new Date().toISOString(),
            context: this.context,
            trace: trace || null,
        };

        return JSON.stringify(log);
    }
    withCtx(context: string): AppLogger {
        this.context = context;
        return this;
    }

    log(message: string) {
        const logMessage = this.formatLog('log', message);
        this.logger.log(logMessage);
    }

    warn(message: string) {
        const logMessage = this.formatLog('warn', message);
        this.logger.warn(logMessage);
    }

    error(message: string, trace?: string) {
        const logMessage = this.formatLog('error', message, trace);
        this.logger.error(logMessage);
    }

    debug(message: string) {
        const logMessage = this.formatLog('debug', message);
        this.logger.debug(logMessage);
    }

    verbose(message: string) {
        const logMessage = this.formatLog('verbose', message);
        this.logger.verbose(logMessage);
    }
}
