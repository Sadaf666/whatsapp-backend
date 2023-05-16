// external libraries
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Name {
	@ApiProperty({ description: 'The first name of the user' })
	@Prop({ default: null, trim: true, lowercase: true })
	first_name: string;

	@ApiProperty({ description: 'The last name of the user' })
	@Prop({ default: null, trim: true, lowercase: true })
	last_name: string;

	@ApiProperty({ description: 'The full name of the user' })
	@Prop({ default: null, trim: true, lowercase: true })
	full_name: string;
}

export type NameDocument = Name & Document;

export const NameSchema = SchemaFactory.createForClass(Name);
