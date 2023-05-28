// external libraries
import {
	WebSocketGateway,
	OnGatewayConnection,
	OnGatewayDisconnect,
	WebSocketServer,
	WsException
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

// repository
import { SocketRepository } from '../web-socket/repository/web-socket.repository';

// schema
import { SocketDocument } from '../web-socket/schema/web-socket.schema';

@WebSocketGateway()
export class WebSocketsGateway
	implements OnGatewayConnection, OnGatewayDisconnect
{
	constructor(private readonly socketRepo: SocketRepository) {}

	@WebSocketServer() server: Server;

	handleConnection(client: Socket) {
		client.emit('connection', 'Successfully connected to server');

		client.on('user', async (payload: any) => {
			const { playerId } = payload;

			let sockets: SocketDocument = await this.socketRepo.getOne({
				playerId
			});

			if (sockets) {
				sockets = await this.socketRepo.update(sockets._id, {
					socketId: client.id
				});

				console.log('client updated ->', client.id);
			} else {
				sockets = await this.socketRepo.insertOne({
					socketId: client.id,
					playerId
				});

				console.log('client connected ->', client.id);
			}
		});
	}

	async handleDisconnect(client: Socket) {
		await this.socketRepo.remove({ socketId: client.id });

		console.log('client disconnected ->', client.id);
	}
}
