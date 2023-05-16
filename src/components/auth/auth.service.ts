// external libraries
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService) {}

	async generateToken(payload: any): Promise<any> {
		try {
			const data: string = this.jwtService.sign(payload);

			return data;
		} catch (error) {
			throw new HttpException(
				{
					success: false,
					error: error.message,
					message: 'Something went wrong.'
				},
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	async verifyToken(token: string): Promise<any> {
		try {
			const data: any = this.jwtService.verify(token);

			return data;
		} catch (error) {
			throw new HttpException(
				{
					success: false,
					error: error.message,
					message: 'Something went wrong.'
				},
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}
}
