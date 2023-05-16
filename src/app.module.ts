// external libraries
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// middleware
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';

// controller
import { AppController } from './app.controller';

// service
import { AppService } from './app.service';

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),

		WinstonModule.forRoot({
			level: 'info',
			format: winston.format.json(),
			// defaultMeta: { service: 'user-service' },
			transports: [
				//
				// - Write all logs with importance level of `error` or less to `error.log`
				// - Write all logs with importance level of `info` or less to `combined.log`
				//
				new winston.transports.File({
					filename: 'error.log',
					level: 'error'
				}),
				new winston.transports.File({ filename: 'combined.log' })
			]
		})
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
