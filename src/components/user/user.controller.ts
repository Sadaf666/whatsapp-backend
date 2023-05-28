// external libraries
import { Controller } from '@nestjs/common';
import { Post, Get, Patch, Delete } from '@nestjs/common';
import { Body, Query, Param, Res } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import {
	ApiTags,
	ApiBody,
	ApiOkResponse,
	ApiCreatedResponse,
	ApiBadRequestResponse,
	ApiInternalServerErrorResponse,
	ApiBearerAuth
} from '@nestjs/swagger';
import { Response } from 'express';

// service
import { UserService } from './user.service';

// dto
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { SignUpUserDto } from './dto/sigup-user.dto';
import { VerifyUserDto } from './dto/verify-otp.dto';
import { FilterUserDto } from './dto/filter-user.dto';

// interface
import { IResponse } from './interface/response.interface';

// Decorators
import { Public } from '../../shared/decorators/global-auth.decorator';

@ApiTags('User')
@ApiBearerAuth('access-token')
@Controller('v1/user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiCreatedResponse({
		status: HttpStatus.CREATED,
		description: 'Creates a use in database.'
	})
	@ApiBadRequestResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Something went wrong.'
	})
	@ApiInternalServerErrorResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Internal server error.'
	})
	@ApiBody({
		type: SignUpUserDto,
		description: 'DTO to create user.'
	})
	@Public()
	@Post()
	async signup(@Res() res: Response, @Body() signUpUserDto: SignUpUserDto) {
		const data: any = await this.userService.signup(signUpUserDto);

		if (data.users) {
			return res.status(HttpStatus.CREATED).json({
				success: true,
				data: data,
				request: {
					body: { signUpUserDto }
				},
				message: 'Game has been created.'
			});
		}

		return res.status(HttpStatus.BAD_REQUEST).json({
			success: false,
			data: null,
			request: {
				body: { signUpUserDto }
			},
			message: 'Something went wrong.'
		});
	}

	@ApiOkResponse({ status: HttpStatus.OK, description: 'Verifies a user.' })
	@ApiBadRequestResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Something went wrong.'
	})
	@ApiInternalServerErrorResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Internal server error.'
	})
	@ApiBody({
		type: VerifyUserDto,
		description: 'DTO to verify user.'
	})
	@Patch('verify/:_id')
	async verify(
		@Res() res: Response,
		@Param('_id') _id: string,
		@Body() verifyUserDto: VerifyUserDto
	) {
		const data: IResponse = await this.userService.verify(
			_id,
			verifyUserDto
		);

		if (!Array.isArray(data.users) && data.users.is_verified === true) {
			return res.status(HttpStatus.OK).json({
				success: true,
				data: data,
				request: {
					body: { verifyUserDto }
				},
				message: 'User has been verified successfully.'
			});
		}

		return res.status(HttpStatus.BAD_REQUEST).json({
			success: true,
			data: data,
			request: {
				body: { verifyUserDto }
			},
			message: 'User has not been verified.'
		});
	}

	@ApiOkResponse({
		status: HttpStatus.OK,
		description: 'finds list of users.'
	})
	@ApiBadRequestResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Something went wrong.'
	})
	@ApiInternalServerErrorResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Internal server error.'
	})
	@Get()
	async findAll(@Res() res: Response, @Query() filterUserDto: FilterUserDto) {
		const data: IResponse = await this.userService.findAll(filterUserDto);

		return res.status(HttpStatus.OK).json({
			success: true,
			data: data,
			request: {
				query: { filterUserDto }
			},
			message:
				Array.isArray(data.users) && data.users.length
					? 'Users has been fetched successfully.'
					: 'No users found.'
		});
	}

	@ApiOkResponse({
		status: HttpStatus.OK,
		description: 'find a user with _id.'
	})
	@ApiBadRequestResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Something went wrong.'
	})
	@ApiInternalServerErrorResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Internal server error.'
	})
	@Get(':_id')
	async findOne(@Res() res: Response, @Param('_id') _id: string) {
		const data: IResponse = await this.userService.findOne(_id);

		return res.status(HttpStatus.OK).json({
			success: true,
			data: !Array.isArray(data.users) && data.users ? data : null,
			request: {
				params: { _id }
			},
			message:
				!Array.isArray(data.users) && data.users
					? 'User has been fetched successfully.'
					: 'No user found.'
		});
	}

	// @Post()
	// create(@Body() createUserDto: CreateUserDto) {
	// 	return this.userService.create(createUserDto);
	// }

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
	// 	return this.userService.update(+id, updateUserDto);
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.userService.remove(+id);
	// }
}
