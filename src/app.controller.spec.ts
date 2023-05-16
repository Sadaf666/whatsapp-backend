// external libraries
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

// controller
import { AppController } from './app.controller';

// service
import { AppService } from './app.service';

describe('AppController', () => {
	let appController: AppController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [
				ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true })
			],
			controllers: [AppController],
			providers: [AppService]
		}).compile();

		appController = app.get<AppController>(AppController);
	});

	describe('root', () => {
		it('should return "WHATSAPP listening on port - 9090 in test mode."', () => {
			expect(appController.getHello()).toBe(
				'WHATSAPP listening on port - 9090 in test mode.'
			);
		});
	});
});
