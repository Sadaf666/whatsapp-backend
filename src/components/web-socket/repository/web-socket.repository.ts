// external libraries
import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//schema
import { Socket, SocketDocument } from '../schema/web-socket.schema';

// helpers
import { sortBy } from 'src/shared/helpers/shared.function';

@Injectable()
export class SocketRepository {
	constructor(
		@InjectModel(Socket.name)
		private readonly Sockets: Model<SocketDocument>
	) {}

	projection: Record<string, unknown> = {
		__v: 0,
		updatedAt: 0
	};

	// insertOne
	async insertOne(object: Record<string, unknown>): Promise<SocketDocument> {
		try {
			const data: SocketDocument = await this.Sockets.create(
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
			const data: any = await this.Sockets.insertMany(
				JSON.parse(JSON.stringify(array))
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

	// getOne
	async getOne(condition: Record<string, unknown>): Promise<SocketDocument> {
		try {
			const data: SocketDocument = await this.Sockets.findOne(
				JSON.parse(JSON.stringify(condition))
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
	): Promise<SocketDocument[]> {
		try {
			const orderBy: any = await sortBy(sort);

			const data: SocketDocument[] = await this.Sockets.find(
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
	): Promise<SocketDocument[]> {
		try {
			const orderBy: any = await sortBy(sort);

			const data: SocketDocument[] = await this.Sockets.find(
				JSON.parse(JSON.stringify(condition))
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
	): Promise<SocketDocument> {
		try {
			const data: SocketDocument = await this.Sockets.findOneAndUpdate(
				JSON.parse(JSON.stringify(condition)),
				object,
				{ new: true }
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
			const data: SocketDocument = await this.Sockets.findOneAndUpdate(
				JSON.parse(JSON.stringify(condition)),
				{ is_active: false },
				{ new: true }
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

	// count
	async count(condition: Record<string, unknown>): Promise<number> {
		try {
			const data: number = await this.Sockets.countDocuments(
				JSON.parse(JSON.stringify(condition))
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
