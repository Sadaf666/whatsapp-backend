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
exports.s3ObjectSchema = exports.s3Object = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let s3Object = class s3Object {
};
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Url from s3 bucket.' }),
    (0, mongoose_1.Prop)({ default: null, trim: true }),
    __metadata("design:type", String)
], s3Object.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The original filename.' }),
    (0, mongoose_1.Prop)({ default: null, trim: true }),
    __metadata("design:type", String)
], s3Object.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The file type of the file.' }),
    (0, mongoose_1.Prop)({ default: null, trim: true }),
    __metadata("design:type", String)
], s3Object.prototype, "file_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Key from the bucket.' }),
    (0, mongoose_1.Prop)({ default: null, trim: true }),
    __metadata("design:type", String)
], s3Object.prototype, "key", void 0);
s3Object = __decorate([
    (0, mongoose_1.Schema)()
], s3Object);
exports.s3Object = s3Object;
exports.s3ObjectSchema = mongoose_1.SchemaFactory.createForClass(s3Object);
//# sourceMappingURL=s3-object.schema.js.map