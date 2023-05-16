"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSetup = void 0;
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const { BASE_URL } = process.env;
function swaggerSetup(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('WHATSAPP')
        .setDescription('Whatsapp APIs')
        .addServer(BASE_URL)
        .setVersion('1.0')
        .addBearerAuth({
        name: 'Authorization',
        in: 'header',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Bearer'
    }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        extraModels: [],
        include: [app_module_1.AppModule]
    });
    swagger_1.SwaggerModule.setup('api-docs', app, document);
}
exports.swaggerSetup = swaggerSetup;
//# sourceMappingURL=swagger.js.map