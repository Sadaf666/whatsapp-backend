"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = exports.sortBy = exports.isMatch = exports.hashPassword = void 0;
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
function hashPassword(password, rounds) {
    try {
        const salt = bcrypt.genSaltSync(rounds);
        const hash = bcrypt.hashSync(password, salt);
        console.log('🚀 # file: shared.function.ts:11 # hashPassword # hash:', hash);
        return hash;
    }
    catch (error) {
        throw new common_1.HttpException({
            success: false,
            error: error.message,
            message: 'Something went wrong.'
        }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.hashPassword = hashPassword;
function isMatch(password, hash) {
    try {
        const result = bcrypt.compareSync(password, hash);
        console.log('🚀 # file: shared.function.ts:28 # isMatch # result:', result);
        return result;
    }
    catch (error) {
        throw new common_1.HttpException({
            success: false,
            error: error.message,
            message: 'Something went wrong.'
        }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.isMatch = isMatch;
function sortBy(sort) {
    try {
        let orderBy = { createdAt: -1 };
        if (sort) {
            orderBy = sort.includes('-')
                ? { [sort.substring(1)]: -1 }
                : { [sort]: 1 };
        }
        console.log('🚀 # file: shared.function.ts:48 # sortBy # orderBy:', orderBy);
        return orderBy;
    }
    catch (error) {
        throw new common_1.HttpException({
            success: false,
            error: error.message,
            message: 'Something went wrong.'
        }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.sortBy = sortBy;
function generateOtp() {
    try {
        const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        console.log('🚀 # file: shared.function.ts:68 # generateOtp # otp:', otp);
        return otp;
    }
    catch (error) {
        throw new common_1.HttpException({
            success: false,
            error: error.message,
            message: 'Something went wrong.'
        }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.generateOtp = generateOtp;
//# sourceMappingURL=shared.function.js.map