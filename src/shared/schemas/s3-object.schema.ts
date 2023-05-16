// external libraries
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class s3Object {
	@ApiProperty({ description: 'Url from s3 bucket.' })
	@Prop({ default: null, trim: true })
	url: string;

	@ApiProperty({ description: 'The original filename.' })
	@Prop({ default: null, trim: true })
	name: string;

	@ApiProperty({ description: 'The file type of the file.' })
	@Prop({ default: null, trim: true })
	file_type: string;

	@ApiProperty({ description: 'Key from the bucket.' })
	@Prop({ default: null, trim: true })
	key: string;
}

export type s3ObjectDocument = s3Object & Document;

export const s3ObjectSchema = SchemaFactory.createForClass(s3Object);
