// external libraries
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';
import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

// middleware
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';

// controller
import { AppController } from './app.controller';

// service
import { AppService } from './app.service';

// module
import { UserModule } from './components/user/user.module';
import { AuthModule } from './components/auth/auth.module';

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
		}),

		MongooseModule.forRootAsync({
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('MONGO_URI'),
				useUnifiedTopology: true,
				useNewUrlParser: true
			}),
			inject: [ConfigService]
		}),

		AuthModule,
		UserModule
	],
	controllers: [AppController],
	providers: [AppService, ConfigService]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
