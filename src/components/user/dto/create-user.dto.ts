// external libraries
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty({ description: 'Country code for the phone number.' })
	@IsNotEmpty()
	@IsNumberString()
	country_code: string;

	@ApiProperty({ description: 'Number for the phone number.' })
	@IsNotEmpty()
	@IsNumberString()
	number: string;

	@ApiProperty({ description: 'Device Id of the user.' })
	@IsNotEmpty()
	@IsString()
	device_id: string;
}
