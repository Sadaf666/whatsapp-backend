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
exports.NameSchema = exports.Name = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let Name = class Name {
};
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The first name of the user' }),
    (0, mongoose_1.Prop)({ default: null, trim: true, lowercase: true }),
    __metadata("design:type", String)
], Name.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The last name of the user' }),
    (0, mongoose_1.Prop)({ default: null, trim: true, lowercase: true }),
    __metadata("design:type", String)
], Name.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The full name of the user' }),
    (0, mongoose_1.Prop)({ default: null, trim: true, lowercase: true }),
    __metadata("design:type", String)
], Name.prototype, "full_name", void 0);
Name = __decorate([
    (0, mongoose_1.Schema)()
], Name);
exports.Name = Name;
exports.NameSchema = mongoose_1.SchemaFactory.createForClass(Name);
//# sourceMappingURL=name.schema.js.map