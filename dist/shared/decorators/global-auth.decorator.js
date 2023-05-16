"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants/constants");
exports.Public = (0, common_1.createParamDecorator)(() => {
    (0, common_1.SetMetadata)(constants_1.IS_PUBLIC_KEY, true);
});
//# sourceMappingURL=global-auth.decorator.js.map