"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const web_socket_schema_1 = require("../web-socket/schema/web-socket.schema");
const web_socket_gateway_1 = require("../web-socket/web-socket.gateway");
const web_socket_repository_1 = require("../web-socket/repository/web-socket.repository");
let WebSocketsModule = class WebSocketsModule {
};
WebSocketsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: web_socket_schema_1.Socket.name, schema: web_socket_schema_1.SocketSchema }])
        ],
        providers: [web_socket_gateway_1.WebSocketsGateway, web_socket_repository_1.SocketRepository],
        exports: [web_socket_gateway_1.WebSocketsGateway]
    })
], WebSocketsModule);
exports.WebSocketsModule = WebSocketsModule;
//# sourceMappingURL=web-socket.module.js.map