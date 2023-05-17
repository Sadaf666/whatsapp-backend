import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from './repository/user.repository';
import { SignUpUserDto } from './dto/sigup-user.dto';
import { VerifyUserDto } from './dto/verify-otp.dto';
import { UserDocument } from './schema/user.schema';
import { generateOtp } from '../../shared/helpers/shared.function';
import * as moment from 'moment-timezone';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

describe('UserService', () => {
	let userService: UserService;
	let authService: AuthService;
	let userRepo: UserRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
				JwtModule.registerAsync({
					useFactory: (configService: ConfigService) => ({
						secret: configService.get('JWT_SECRET_KEY'),
						signOptions: {
							expiresIn: configService.get<string>(
								'JWT_EXPIRATION_TIME'
							)
						}
					}),
					inject: [ConfigService]
				})
			],
			providers: [
				UserService,
				AuthService,
				{
					provide: UserRepository,
					useValue: {
						getOne: jest.fn(),
						update: jest.fn(),
						insertOne: jest.fn()
					}
				}
			]
		}).compile();

		userService = module.get<UserService>(UserService);
		authService = module.get<AuthService>(AuthService);
		userRepo = module.get<UserRepository>(UserRepository);
	});

	describe('signup', () => {
		const mockUser: any = {
			_id: '123',
			phone_number: {
				country_code: '1',
				number: '555-555-5555'
			},
			is_active: true,
			is_verified: false
		};

		const mockSignUpUserDto: SignUpUserDto = {
			country_code: '1',
			number: '555-555-5555'
		};

		it('should create a new user and return a token if the user does not exist', async () => {
			jest.spyOn(authService, 'generateToken').mockResolvedValue(
				'mockToken'
			);
			jest.spyOn(userRepo, 'getOne').mockResolvedValue(null);
			jest.spyOn(userRepo, 'insertOne').mockResolvedValue(mockUser);

			const result = await userService.signup(mockSignUpUserDto);

			expect(userRepo.getOne).toHaveBeenCalledWith({
				'phone_number.country_code': mockSignUpUserDto.country_code,
				'phone_number.number': mockSignUpUserDto.number,
				is_active: true
			});
			expect(userRepo.insertOne).toHaveBeenCalledWith({
				'phone_number.country_code': mockSignUpUserDto.country_code,
				'phone_number.number': mockSignUpUserDto.number,
				'otp.value': expect.any(Number),
				'otp.expires_at': expect.any(Object)
			});
			expect(authService.generateToken).toHaveBeenCalledWith({
				_id: mockUser._id
			});
			expect(result).toEqual({
				token: 'mockToken',
				users: mockUser
			});
		});

		it('should return a token and the user if the user exists and is verified', async () => {
			jest.spyOn(authService, 'generateToken').mockResolvedValue(
				'mockToken'
			);
			jest.spyOn(userRepo, 'getOne').mockResolvedValue({
				...mockUser,
				is_verified: true
			});

			const result = await userService.signup(mockSignUpUserDto);

			expect(userRepo.getOne).toHaveBeenCalledWith({
				'phone_number.country_code': mockSignUpUserDto.country_code,
				'phone_number.number': mockSignUpUserDto.number,
				is_active: true
			});
			expect(authService.generateToken).toHaveBeenCalledWith({
				_id: mockUser._id
			});
			expect(result).toEqual({
				token: 'mockToken',
				users: {
					...mockUser,
					is_verified: true
				}
			});
		});

		it('should update the user and return a token if the user exists and is not verified', async () => {
			jest.spyOn(authService, 'generateToken').mockResolvedValue(
				'mockToken'
			);
			jest.spyOn(userRepo, 'getOne').mockResolvedValue(mockUser);
			jest.spyOn(userRepo, 'update').mockResolvedValue({
				...mockUser,
				'otp.value': 123456,
				'otp.expires_at': moment().add(5, 'minutes')
			});

			const result = await userService.signup(mockSignUpUserDto);

			expect(userRepo.getOne).toHaveBeenCalledWith({
				'phone_number.country_code': mockSignUpUserDto.country_code,
				'phone_number.number': mockSignUpUserDto.number,
				is_active: true
			});
			expect(userRepo.update).toHaveBeenCalledWith(
				{ _id: mockUser._id },
				{
					$set: {
						'otp.value': expect.any(Number),
						'otp.expires_at': expect.any(String)
					}
				}
			);
			expect(authService.generateToken).toHaveBeenCalledWith({
				_id: mockUser._id
			});
			expect(result).toEqual({
				token: 'mockToken',
				users: {
					...mockUser,
					'otp.value': expect.any(Number),
					'otp.expires_at': expect.any(String)
				}
			});
		});
	});

	describe('verify', () => {
		const mockUserId = '123';
		const mockVerifyUserDto: VerifyUserDto = {
			otp: '123456'
		};
		const mockUser: any = {
			_id: mockUserId,
			phone_number: {
				country_code: '1',
				number: '555-555-5555'
			},
			is_active: true,
			is_verified: false,
			otp: {
				value: 123456,
				expires_at: moment().add(5, 'minutes')
			}
		};

		it('should throw an error if the user does not exist', async () => {
			jest.spyOn(userRepo, 'getOne').mockResolvedValue(null);

			await expect(
				userService.verify(mockUserId, mockVerifyUserDto)
			).rejects.toThrowError('Cannot verify otp.');
			expect(userRepo.getOne).toHaveBeenCalledWith({ _id: mockUserId });
		});

		it('should throw an error if the OTP is invalid', async () => {
			jest.spyOn(userRepo, 'getOne').mockResolvedValue(mockUser);

			await expect(
				userService.verify(mockUserId, { otp: '654321' })
			).rejects.toThrowError('Invalid OTP.');
			expect(userRepo.getOne).toHaveBeenCalledWith({ _id: mockUserId });
		});

		it('should throw an error if the OTP has expired', async () => {
			jest.spyOn(userRepo, 'getOne').mockResolvedValue({
				...mockUser,
				otp: {
					value: 123456,
					expires_at: moment().subtract(5, 'minutes')
				}
			});
			jest.spyOn(userRepo, 'update').mockResolvedValue({
				...mockUser,
				otp: {
					value: null,
					expires_at: null
				}
			});

			await expect(
				userService.verify(mockUserId, mockVerifyUserDto)
			).rejects.toThrowError('Cannot verify otp.');
			expect(userRepo.getOne).toHaveBeenCalledWith({ _id: mockUserId });
			expect(userRepo.update).toHaveBeenCalledWith(
				{ _id: mockUserId },
				{ $set: { 'otp.value': null } }
			);
		});

		it('should update the user and set is_verified to true if the OTP is valid and has not expired', async () => {
			jest.spyOn(userRepo, 'getOne').mockResolvedValue(mockUser);
			jest.spyOn(userRepo, 'update').mockResolvedValue({
				...mockUser,
				is_verified: true,
				otp: {
					value: null,
					expires_at: null
				}
			});

			await userService.verify(mockUserId, mockVerifyUserDto);
			expect(userRepo.getOne).toHaveBeenCalledWith({ _id: mockUserId });
			expect(userRepo.update).toHaveBeenCalledWith(
				{ _id: mockUserId },
				{ $set: { is_verified: true, 'otp.value': null } }
			);
		});
	});
});
