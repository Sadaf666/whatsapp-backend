// external libraries
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpUserDto {
	@ApiProperty({ description: 'Country code for the phone number.' })
	@IsNotEmpty()
	@IsNumberString()
	country_code: string;

	@ApiProperty({ description: 'Number for the phone number.' })
	@IsNotEmpty()
	@IsNumberString()
	number: string;

	// @ApiProperty({ description: 'Name to signup user.' })
	// @IsNotEmpty()
	// @IsString()
	// name: string;
	// @ApiProperty({ description: 'Email to signup user.' })
	// @IsNotEmpty()
	// @IsString()
	// @IsEmail()
	// email: string;
	// @ApiProperty({ description: 'Password to signup the user.' })
	// @IsNotEmpty()
	// @IsString()
	// @IsBase64()
	// password: string;
}
