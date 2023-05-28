"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const web_socket_repository_1 = require("../web-socket/repository/web-socket.repository");
let WebSocketsGateway = class WebSocketsGateway {
    constructor(socketRepo) {
        this.socketRepo = socketRepo;
    }
    handleConnection(client) {
        client.emit('connection', 'Successfully connected to server');
        client.on('user', async (payload) => {
            const { playerId } = payload;
            let sockets = await this.socketRepo.getOne({
                playerId
            });
            if (sockets) {
                sockets = await this.socketRepo.update(sockets._id, {
                    socketId: client.id
                });
                console.log('client updated ->', client.id);
            }
            else {
                sockets = await this.socketRepo.insertOne({
                    socketId: client.id,
                    playerId
                });
                console.log('client connected ->', client.id);
            }
        });
    }
    async handleDisconnect(client) {
        await this.socketRepo.remove({ socketId: client.id });
        console.log('client disconnected ->', client.id);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebSocketsGateway.prototype, "server", void 0);
WebSocketsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [web_socket_repository_1.SocketRepository])
], WebSocketsGateway);
exports.WebSocketsGateway = WebSocketsGateway;
//# sourceMappingURL=web-socket.gateway.js.map