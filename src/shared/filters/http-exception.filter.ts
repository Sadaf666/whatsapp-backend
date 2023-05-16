// external libraries
import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	LoggerService,
	Inject
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	constructor(
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService
	) {}

	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();

		const req = ctx.getRequest<Request>(),
			res = ctx.getResponse<Response>(),
			status: number = exception.getStatus(),
			error: any = exception.getResponse();

		this.logger.error(
			`Error encountered with Method "${req.method}" for "${process.env.BASE_URL}${req.url}" and token "${req.headers['authorization']}"`,
			error
		);

		res.status(status).json(error);
	}
}
