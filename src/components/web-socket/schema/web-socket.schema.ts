// external libraries
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// schema
import { User } from '../../user/schema/user.schema';

@Schema({ collection: 'sockets', timestamps: true })
export class Socket {
	@ApiProperty({ description: 'Socket id of the user.' })
	@Prop({ default: null })
	socketId: string;

	@ApiProperty({ description: 'Full name for the user.' })
	@Prop({
		type: MongooseSchema.Types.ObjectId,
		ref: User.name
	})
	playerId: string;

	@ApiProperty({ description: 'The status of the document.' })
	@Prop({ default: true, index: true })
	is_active: boolean;
}

export type SocketDocument = Socket & Document;

export const SocketSchema = SchemaFactory.createForClass(Socket);
