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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const name_schema_1 = require("../../../shared/schemas/name.schema");
const phone_number_schema_1 = require("../../../shared/schemas/phone-number.schema");
const s3_object_schema_1 = require("../../../shared/schemas/s3-object.schema");
const otp_schema_1 = require("../../../shared/schemas/otp.schema");
let User = class User {
};
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The name of the user' }),
    (0, mongoose_1.Prop)({ default: new name_schema_1.Name(), type: name_schema_1.Name }),
    __metadata("design:type", name_schema_1.Name)
], User.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The phone number of the user' }),
    (0, mongoose_1.Prop)({ default: new phone_number_schema_1.PhoneNumber(), type: phone_number_schema_1.PhoneNumber }),
    __metadata("design:type", phone_number_schema_1.PhoneNumber)
], User.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The email of the user' }),
    (0, mongoose_1.Prop)({ default: null, trim: true, lowercase: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The password of the user' }),
    (0, mongoose_1.Prop)({ default: null, trim: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The profile picture of the user' }),
    (0, mongoose_1.Prop)({ default: new s3_object_schema_1.S3Object(), type: s3_object_schema_1.S3Object }),
    __metadata("design:type", s3_object_schema_1.S3Object)
], User.prototype, "profile_pic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Device Id of the user.' }),
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], User.prototype, "device_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The status of the document.' }),
    (0, mongoose_1.Prop)({ default: new otp_schema_1.Otp(), type: otp_schema_1.Otp }),
    __metadata("design:type", otp_schema_1.Otp)
], User.prototype, "otp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Verification status of the user.' }),
    (0, mongoose_1.Prop)({ default: false, index: true }),
    __metadata("design:type", Boolean)
], User.prototype, "is_verified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The status of the document.' }),
    (0, mongoose_1.Prop)({ default: true, index: true }),
    __metadata("design:type", Boolean)
], User.prototype, "is_active", void 0);
User = __decorate([
    (0, mongoose_1.Schema)({
        collection: 'users',
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                delete ret.password;
                delete ret.__v;
                delete ret.updatedAt;
                delete ret.name._id;
                delete ret.phone_number._id;
                delete ret.profile_pic._id;
                delete ret.otp._id;
                return ret;
            }
        }
    })
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User).index({});
//# sourceMappingURL=user.schema.js.map