import { ExceptionFilter, ArgumentsHost, HttpException, LoggerService } from '@nestjs/common';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger;
    constructor(logger: LoggerService);
    catch(exception: HttpException, host: ArgumentsHost): void;
}
