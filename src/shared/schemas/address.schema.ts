// external libraries
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Address {
	@ApiProperty({ description: 'Address line of the user contact.' })
	@Prop({ default: null, trim: true })
	address_line: string;

	@ApiProperty({ description: 'City of the user contact.' })
	@Prop({ default: null, trim: true })
	city: string;

	@ApiProperty({ description: 'State of the user contact.' })
	@Prop({ default: null, trim: true })
	state: string;

	@ApiProperty({ description: 'Region of the user contact.' })
	@Prop({ default: null, trim: true })
	region: string;

	@ApiProperty({ description: 'Country of the user contact.' })
	@Prop({ default: null, trim: true })
	country: string;

	@ApiProperty({ description: 'Zip code of the user contact.' })
	@Prop({ default: null, trim: true })
	zip_code: string;

	@ApiProperty({ description: 'Full address of the user contact.' })
	@Prop({ default: null, trim: true })
	full_address: string;
}

export type AddressDocument = Address & Document;

export const AddressSchema = SchemaFactory.createForClass(Address);
