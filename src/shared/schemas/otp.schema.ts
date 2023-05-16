// external libraries
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Otp {
	@ApiProperty({ description: 'Value the of the otp.' })
	@Prop({ default: null })
	value: number;

	@ApiProperty({ description: 'The expiration time of the otp.' })
	@Prop({ default: null })
	expires_at: Date;
}

export type OtpDocument = Otp & Document;

export const OtpSchema = SchemaFactory.createForClass(Otp);
