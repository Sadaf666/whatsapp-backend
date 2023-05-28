// external libraries
import { IsOptional, IsString, IsNumberString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterUserDto {
	@ApiPropertyOptional({
		description: 'Page number for the data.',
		required: false,
		default: 1
	})
	@IsOptional()
	@IsNumberString()
	page: string = '1';

	@ApiPropertyOptional({
		description: 'Limit of the documents to get from a query.',
		required: false,
		default: 20
	})
	@IsOptional()
	@IsNumberString()
	limit: string = '20';

	@ApiPropertyOptional({
		description: 'Page number for the data.',
		required: false,
		default: '-createdAt'
	})
	@IsOptional()
	@IsString()
	sort: string = undefined;
}
