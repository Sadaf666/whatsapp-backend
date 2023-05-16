// external libraries
import * as moment from 'moment-timezone';
import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// dto
import { SignUpUserDto } from './dto/sigup-user.dto';
import { VerifyUserDto } from './dto/verify-otp.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// schema
import { UserDocument } from './schema/user.schema';

// repository
import { UserRepository } from './repository/user.repository';

// service
import { AuthService } from '../auth/auth.service';

// helpers
import { generateOtp } from '../../shared/helpers/shared.function';

@Injectable()
export class UserService {
	constructor(
		private readonly configService: ConfigService,
		private readonly userRepo: UserRepository,
		private readonly authService: AuthService
	) {}

	async signup(signupUserDto: SignUpUserDto) {
		const { country_code, number } = signupUserDto;

		let users: UserDocument = await this.userRepo.getOne({
			'phone_number.country_code': country_code,
			'phone_number.number': number,
			is_active: true
		});

		const otp: number = generateOtp(),
			expires_at: moment.Moment = moment().add(5, 'minutes');

		if (users) {
			const token: string = await this.authService.generateToken({
				_id: users._id
			});

			if (users.is_verified) {
				return { token, users };
			}

			users = await this.userRepo.update(
				{ _id: users._id },
				{ $set: { 'otp.value': otp, 'otp.expires_at': expires_at } }
			);

			return { token, users };
		}

		users = await this.userRepo.insertOne({
			'phone_number.country_code': country_code,
			'phone_number.number': number,
			'otp.value': otp,
			'otp.expires_at': expires_at
		});

		const token: string = await this.authService.generateToken({
			_id: users._id
		});

		return { token, users };
	}

	create(createUserDto: CreateUserDto) {
		return 'This action adds a new user';
	}

	// findAll() {
	// 	return `This action returns all user`;
	// }

	// findOne(id: number) {
	// 	return `This action returns a #${id} user`;
	// }

	// update(id: number, updateUserDto: UpdateUserDto) {
	// 	return `This action updates a #${id} user`;
	// }

	// remove(id: number) {
	// 	return `This action removes a #${id} user`;
	// }
}
