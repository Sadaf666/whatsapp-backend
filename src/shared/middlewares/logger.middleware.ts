// external libraries
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	private logger = new Logger();

	use(req: Request, res: Response, next: any) {
		const { method, url, headers } = req;

		this.logger.verbose(`${method} : ${process.env.BASE_URL}${url}`);

		this.logger.debug(`${headers['authorization']}`);

		next();
	}
}
