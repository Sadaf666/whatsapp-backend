// external libraries
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// schema

// modules
import { AppModule } from './app.module';

const { BASE_URL } = process.env;

export function swaggerSetup(app: INestApplication) {
	const config = new DocumentBuilder()
		.setTitle('WHATSAPP')
		.setDescription('Whatsapp APIs')
		.addServer(BASE_URL)
		.setVersion('1.0')
		.addBearerAuth(
			{
				name: 'Authorization',
				in: 'header',
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'Bearer'
			},
			'access-token'
		)
		.build();

	const document = SwaggerModule.createDocument(app, config, {
		extraModels: [],
		include: [AppModule]
	});

	SwaggerModule.setup('api-docs', app, document);
}
