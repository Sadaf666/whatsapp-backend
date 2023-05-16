// external libraries
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyUserDto {
	// @ApiProperty({ description: '_id of the user document.' })
	// @IsNotEmpty()
	// @IsString()
	// user_id: string;

	@ApiProperty({ description: 'OTP to verify user.' })
	@IsNotEmpty()
	@IsNumberString()
	otp: string;
}
