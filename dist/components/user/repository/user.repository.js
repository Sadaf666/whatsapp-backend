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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schema/user.schema");
const shared_function_1 = require("../../../shared/helpers/shared.function");
let UserRepository = class UserRepository {
    constructor(Users) {
        this.Users = Users;
        this.projection = {
            __v: 0,
            updatedAt: 0,
            password: 0,
            'name._id': 0,
            'phone_number._id': 0,
            'profile_pic._id': 0,
            'otp._id': 0
        };
    }
    async insertOne(object) {
        try {
            const data = await this.Users.create(JSON.parse(JSON.stringify(object)));
            return data;
        }
        catch (error) {
            throw new common_2.HttpException({
                success: false,
                error: error.message,
                message: 'Something went wrong.'
            }, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async insertMany(array) {
        try {
            const data = await this.Users.insertMany(JSON.parse(JSON.stringify(array)));
            return data;
        }
        catch (error) {
            throw new common_2.HttpException({
                success: false,
                error: error.message,
                message: 'Something went wrong.'
            }, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getOne(condition) {
        try {
            const data = await this.Users.findOne(JSON.parse(JSON.stringify(condition))).lean();
            return data;
        }
        catch (error) {
            throw new common_2.HttpException({
                success: false,
                error: error.message,
                message: 'Something went wrong.'
            }, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllWithPagination(condition, sort, skip, limit) {
        try {
            const orderBy = await (0, shared_function_1.sortBy)(sort);
            const data = await this.Users.find(JSON.parse(JSON.stringify(condition)), this.projection)
                .sort(orderBy)
                .skip(skip)
                .limit(limit)
                .lean();
            return data;
        }
        catch (error) {
            throw new common_2.HttpException({
                success: false,
                error: error.message,
                message: 'Something went wrong.'
            }, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAll(condition, sort) {
        try {
            const orderBy = await (0, shared_function_1.sortBy)(sort);
            const data = await this.Users.find(JSON.parse(JSON.stringify(condition)))
                .sort(orderBy)
                .lean();
            return data;
        }
        catch (error) {
            throw new common_2.HttpException({
                success: false,
                error: error.message,
                message: 'Something went wrong.'
            }, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(condition, object) {
        try {
            const data = await this.Users.findOneAndUpdate(JSON.parse(JSON.stringify(condition)), object, { new: true }).lean();
            return data;
        }
        catch (error) {
            throw new common_2.HttpException({
                success: false,
                error: error.message,
                message: 'Something went wrong.'
            }, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(condition) {
        try {
            const data = await this.Users.findOneAndUpdate(JSON.parse(JSON.stringify(condition)), { is_active: false }, { new: true }).lean();
            return null;
        }
        catch (error) {
            throw new common_2.HttpException({
                success: false,
                error: error.message,
                message: 'Something went wrong.'
            }, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async count(condition) {
        try {
            const data = await this.Users.countDocuments(JSON.parse(JSON.stringify(condition))).lean();
            return data;
        }
        catch (error) {
            throw new common_2.HttpException({
                success: false,
                error: error.message,
                message: 'Something went wrong.'
            }, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async test() {
        try {
        }
        catch (error) {
            throw new common_2.HttpException({
                success: false,
                error: error.message,
                message: 'Something went wrong.'
            }, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map