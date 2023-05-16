// external libraries
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';

export function hashPassword(password: string, rounds: number): string {
	try {
		const salt: any = bcrypt.genSaltSync(rounds);

		const hash: string = bcrypt.hashSync(password, salt);

		console.log(
			'🚀 # file: shared.function.ts:11 # hashPassword # hash:',
			hash
		);

		return hash;
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

export function isMatch(password: string, hash: string): boolean {
	try {
		const result: boolean = bcrypt.compareSync(password, hash);

		console.log(
			'🚀 # file: shared.function.ts:28 # isMatch # result:',
			result
		);

		return result;
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

export function sortBy(sort: string): Record<string, unknown> {
	try {
		let orderBy: Record<string, unknown> = { createdAt: -1 };

		if (sort) {
			orderBy = sort.includes('-')
				? { [sort.substring(1)]: -1 }
				: { [sort]: 1 };
		}

		console.log(
			'🚀 # file: shared.function.ts:48 # sortBy # orderBy:',
			orderBy
		);

		return orderBy;
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

export function generateOtp(): number {
	try {
		const otp: number =
			Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

		console.log(
			'🚀 # file: shared.function.ts:68 # generateOtp # otp:',
			otp
		);

		return otp;
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
