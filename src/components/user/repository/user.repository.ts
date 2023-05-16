// external libraries
import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//schema
import { User, UserDocument } from '../schema/user.schema';

// helpers
import { sortBy } from 'src/shared/helpers/shared.function';

@Injectable()
export class UserRepository {
	constructor(
		@InjectModel(User.name) private readonly Users: Model<UserDocument>
	) {}

	projection: Record<string, unknown> = {
		name: 1,
		phone_number: 1,
		email: 1,
		profile_pic: 1,
		is_active: 1,
		createdAt: 1
	};

	// insertOne
	async insertOne(object: Record<string, unknown>): Promise<UserDocument> {
		try {
			const data: UserDocument = await this.Users.create(
				JSON.parse(JSON.stringify(object))
			);

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

	// insertMany
	async insertMany(array: Record<string, unknown>[]): Promise<any> {
		try {
			const data: any = await this.Users.insertMany(array);

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

	// getOne
	async getOne(condition: Record<string, unknown>): Promise<UserDocument> {
		try {
			const data: UserDocument = await this.Users.findOne(
				JSON.parse(JSON.stringify(condition)),
				this.projection
			).lean();

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

	// getAllWithPagination
	async getAllWithPagination(
		condition: Record<string, unknown>,
		sort: string,
		skip: number,
		limit: number
	): Promise<UserDocument[]> {
		try {
			const orderBy: any = await sortBy(sort);

			const data: UserDocument[] = await this.Users.find(
				JSON.parse(JSON.stringify(condition)),
				this.projection
			)
				.sort(orderBy)
				.skip(skip)
				.limit(limit)
				.lean();

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

	// getAll
	async getAll(
		condition: Record<string, unknown>,
		sort: string
	): Promise<UserDocument[]> {
		try {
			const orderBy: any = await sortBy(sort);

			const data: UserDocument[] = await this.Users.find(
				JSON.parse(JSON.stringify(condition)),
				this.projection
			)
				.sort(orderBy)
				.lean();

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

	// update
	async update(
		condition: Record<string, unknown>,
		object: Record<string, unknown>
	): Promise<UserDocument> {
		try {
			const data: UserDocument = await this.Users.findOneAndUpdate(
				JSON.parse(JSON.stringify(condition)),
				object,
				{ new: true, projection: this.projection }
			).lean();

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

	// remove
	async remove(condition: Record<string, unknown>): Promise<any> {
		try {
			const data: UserDocument = await this.Users.findOneAndUpdate(
				JSON.parse(JSON.stringify(condition)),
				{ is_active: false },
				{ new: true, projection: this.projection }
			).lean();

			return null;
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

	// test
	async test(): Promise<void> {
		try {
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
