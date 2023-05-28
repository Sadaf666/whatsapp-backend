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
exports.UserService = void 0;
const moment = require("moment-timezone");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const user_repository_1 = require("./repository/user.repository");
const auth_service_1 = require("../auth/auth.service");
const shared_function_1 = require("../../shared/helpers/shared.function");
let UserService = class UserService {
    constructor(configService, userRepo, authService) {
        this.configService = configService;
        this.userRepo = userRepo;
        this.authService = authService;
    }
    async signup(signupUserDto) {
        const { country_code, number } = signupUserDto;
        let users = await this.userRepo.getOne({
            'phone_number.country_code': country_code.includes('+')
                ? country_code
                : `+${country_code}`,
            'phone_number.number': number,
            is_active: true
        });
        const otp = (0, shared_function_1.generateOtp)(), expires_at = moment().add(5, 'minutes');
        if (users) {
            const token = await this.authService.generateToken({
                _id: users._id
            });
            if (users.is_verified) {
                return { token, users };
            }
            users = await this.userRepo.update({ _id: users._id }, {
                $set: JSON.parse(JSON.stringify({
                    'otp.value': otp,
                    'otp.expires_at': expires_at
                }))
            });
            return { token, users };
        }
        users = await this.userRepo.insertOne({
            'phone_number.country_code': country_code.includes('+')
                ? country_code
                : `+${country_code}`,
            'phone_number.number': number,
            'otp.value': otp,
            'otp.expires_at': expires_at
        });
        const token = await this.authService.generateToken({
            _id: users._id
        });
        return { token, users };
    }
    async verify(_id, verifyUserDto) {
        const { otp } = verifyUserDto;
        let users = await this.userRepo.getOne({ _id });
        if (!users) {
            throw new common_2.HttpException({
                success: false,
                error: `User not found with this ${_id} _id.`,
                message: 'Cannot verify otp.'
            }, common_2.HttpStatus.BAD_REQUEST);
        }
        if (users.otp.value !== +otp) {
            throw new common_2.HttpException({
                success: false,
                error: 'Invalid OTP.',
                message: 'Invalid OTP.'
            }, common_2.HttpStatus.BAD_REQUEST);
        }
        if (moment().isAfter(users.otp.expires_at)) {
            users = await this.userRepo.update({ _id }, { $set: JSON.parse(JSON.stringify({ 'otp.value': null })) });
            throw new common_2.HttpException({
                success: false,
                error: 'OTP has been expired.',
                message: 'Cannot verify otp.'
            }, common_2.HttpStatus.BAD_REQUEST);
        }
        users = await this.userRepo.update({ _id }, {
            $set: JSON.parse(JSON.stringify({ is_verified: true, 'otp.value': null }))
        });
        return { users };
    }
    async findAll(filterUserDto) {
        const { page, limit, sort } = filterUserDto;
        let limits = limit ? +limit : 20, pages = page ? +page : 1, skip = pages > 1 ? (pages - 1) * limits : 0;
        const condition = { is_active: true };
        const users = await this.userRepo.getAllWithPagination(condition, sort, skip, limits);
        const totalResults = await this.userRepo.count(condition);
        pages = Math.ceil(totalResults / limits);
        return { users, totalResults, pages };
    }
    async findOne(_id) {
        const users = await this.userRepo.getOne({ _id });
        return { users };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_repository_1.UserRepository,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map