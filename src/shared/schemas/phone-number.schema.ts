// external libraries
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class PhoneNumber {
	@ApiProperty({ description: 'Label for phone number.' })
	@Prop({ default: null, trim: true, lowercase: true })
	label: string;

	@ApiProperty({ description: 'Country code for phone number.' })
	@Prop({ default: null, trim: true })
	country_code: string;

	@ApiProperty({ description: 'Number for phone number.' })
	@Prop({ default: null, trim: true })
	number: string;

	@ApiProperty({ description: 'Full number with country code.' })
	@Prop({ default: null, trim: true })
	full_number: string;
}

export type PhoneNumberDocument = PhoneNumber & Document;

export const PhoneNumberSchema = SchemaFactory.createForClass(PhoneNumber);
