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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const common_4 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("./user.service");
const sigup_user_dto_1 = require("./dto/sigup-user.dto");
const verify_otp_dto_1 = require("./dto/verify-otp.dto");
const filter_user_dto_1 = require("./dto/filter-user.dto");
const global_auth_decorator_1 = require("../../shared/decorators/global-auth.decorator");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async signup(res, signUpUserDto) {
        const data = await this.userService.signup(signUpUserDto);
        if (data.users) {
            return res.status(common_4.HttpStatus.CREATED).json({
                success: true,
                data: data,
                request: {
                    body: { signUpUserDto }
                },
                message: 'Game has been created.'
            });
        }
        return res.status(common_4.HttpStatus.BAD_REQUEST).json({
            success: false,
            data: null,
            request: {
                body: { signUpUserDto }
            },
            message: 'Something went wrong.'
        });
    }
    async verify(res, _id, verifyUserDto) {
        const data = await this.userService.verify(_id, verifyUserDto);
        if (!Array.isArray(data.users) && data.users.is_verified === true) {
            return res.status(common_4.HttpStatus.OK).json({
                success: true,
                data: data,
                request: {
                    body: { verifyUserDto }
                },
                message: 'User has been verified successfully.'
            });
        }
        return res.status(common_4.HttpStatus.BAD_REQUEST).json({
            success: true,
            data: data,
            request: {
                body: { verifyUserDto }
            },
            message: 'User has not been verified.'
        });
    }
    async findAll(res, filterUserDto) {
        const data = await this.userService.findAll(filterUserDto);
        return res.status(common_4.HttpStatus.OK).json({
            success: true,
            data: data,
            request: {
                query: { filterUserDto }
            },
            message: Array.isArray(data.users) && data.users.length
                ? 'Users has been fetched successfully.'
                : 'No users found.'
        });
    }
    async findOne(res, _id) {
        const data = await this.userService.findOne(_id);
        return res.status(common_4.HttpStatus.OK).json({
            success: true,
            data: !Array.isArray(data.users) && data.users ? data : null,
            request: {
                params: { _id }
            },
            message: !Array.isArray(data.users) && data.users
                ? 'User has been fetched successfully.'
                : 'No user found.'
        });
    }
};
__decorate([
    (0, swagger_1.ApiCreatedResponse)({
        status: common_4.HttpStatus.CREATED,
        description: 'Creates a use in database.'
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: common_4.HttpStatus.BAD_REQUEST,
        description: 'Something went wrong.'
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        status: common_4.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error.'
    }),
    (0, swagger_1.ApiBody)({
        type: sigup_user_dto_1.SignUpUserDto,
        description: 'DTO to create user.'
    }),
    (0, global_auth_decorator_1.Public)(),
    (0, common_2.Post)(),
    __param(0, (0, common_3.Res)()),
    __param(1, (0, common_3.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, sigup_user_dto_1.SignUpUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ status: common_4.HttpStatus.OK, description: 'Verifies a user.' }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: common_4.HttpStatus.BAD_REQUEST,
        description: 'Something went wrong.'
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        status: common_4.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error.'
    }),
    (0, swagger_1.ApiBody)({
        type: verify_otp_dto_1.VerifyUserDto,
        description: 'DTO to verify user.'
    }),
    (0, common_2.Patch)('verify/:_id'),
    __param(0, (0, common_3.Res)()),
    __param(1, (0, common_3.Param)('_id')),
    __param(2, (0, common_3.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, verify_otp_dto_1.VerifyUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verify", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        status: common_4.HttpStatus.OK,
        description: 'finds list of users.'
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: common_4.HttpStatus.BAD_REQUEST,
        description: 'Something went wrong.'
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        status: common_4.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error.'
    }),
    (0, common_2.Get)(),
    __param(0, (0, common_3.Res)()),
    __param(1, (0, common_3.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filter_user_dto_1.FilterUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        status: common_4.HttpStatus.OK,
        description: 'find a user with _id.'
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: common_4.HttpStatus.BAD_REQUEST,
        description: 'Something went wrong.'
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        status: common_4.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error.'
    }),
    (0, common_2.Get)(':_id'),
    __param(0, (0, common_3.Res)()),
    __param(1, (0, common_3.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('v1/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map