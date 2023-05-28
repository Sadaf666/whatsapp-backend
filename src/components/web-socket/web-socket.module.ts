// external libraries
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// models
import { Socket, SocketSchema } from '../web-socket/schema/web-socket.schema';

// classes
import { WebSocketsGateway } from '../web-socket/web-socket.gateway';
import { SocketRepository } from '../web-socket/repository/web-socket.repository';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Socket.name, schema: SocketSchema }])
	],
	providers: [WebSocketsGateway, SocketRepository],
	exports: [WebSocketsGateway]
})
export class WebSocketsModule {}
