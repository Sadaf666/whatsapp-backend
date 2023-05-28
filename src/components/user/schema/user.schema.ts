// external libraries
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// schema
import { Name } from 'src/shared/schemas/name.schema';
import { PhoneNumber } from 'src/shared/schemas/phone-number.schema';
import { s3Object } from 'src/shared/schemas/s3-object.schema';
import { Otp } from 'src/shared/schemas/otp.schema';

@Schema({
	collection: 'users',
	timestamps: true,
	toJSON: {
		transform: (doc: any, ret: any) => {
			delete ret.password;
			delete ret.__v;
			delete ret.updatedAt;
			delete ret.name._id;
			delete ret.phone_number._id;
			delete ret.profile_pic._id;
			delete ret.otp._id;
			return ret;
		}
	}
})
export class User {
	@ApiProperty({ description: 'The name of the user' })
	@Prop({ default: new Name(), type: Name })
	name: Name;

	@ApiProperty({ description: 'The phone number of the user' })
	@Prop({ default: new PhoneNumber(), type: PhoneNumber })
	phone_number: PhoneNumber;

	@ApiProperty({ description: 'The email of the user' })
	@Prop({ default: null, trim: true, lowercase: true })
	email: string;

	@ApiProperty({ description: 'The password of the user' })
	@Prop({ default: null, trim: true })
	password: string;

	@ApiProperty({ description: 'The profile picture of the user' })
	@Prop({ default: new s3Object(), type: s3Object })
	profile_pic: s3Object;

	@ApiProperty({ description: 'The status of the document.' })
	@Prop({ default: new Otp(), type: Otp })
	otp: Otp;

	@ApiProperty({ description: 'Verification status of the user.' })
	@Prop({ default: false, index: true })
	is_verified: boolean;

	@ApiProperty({ description: 'The status of the document.' })
	@Prop({ default: true, index: true })
	is_active: boolean;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User).index({});
