import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { SocketRepository } from '../web-socket/repository/web-socket.repository';
export declare class WebSocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly socketRepo;
    constructor(socketRepo: SocketRepository);
    server: Server;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): Promise<void>;
}
