// external libraries
import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

// service
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@ApiOkResponse({
		status: HttpStatus.OK,
		description: 'App working status.'
	})
	@Get()
	getHello(): string {
		return this.appService.getHello();
	}
}
