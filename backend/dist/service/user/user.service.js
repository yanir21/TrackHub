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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(createUserDto) {
        const hashSalt = process.env.HASH_SALT;
        const hashedPassowrd = await bcrypt.hash(createUserDto.password, hashSalt);
        const userWithHashedPassword = Object.assign(Object.assign({}, createUserDto), { password: hashedPassowrd });
        const newUser = await new this.userModel(userWithHashedPassword);
        return newUser.save();
    }
    async updateUser(userId, updateUserDto) {
        const existingUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
        if (!existingUser) {
            throw new common_1.NotFoundException(`User #${userId} not found`);
        }
        return existingUser;
    }
    async getAllUsers() {
        const userData = await this.userModel.find();
        if (!userData || userData.length == 0) {
            throw new common_1.NotFoundException("Users data not found!");
        }
        return userData;
    }
    async getUser(userId) {
        const existingUser = await this.userModel.findById(userId).exec();
        if (!existingUser) {
            throw new common_1.NotFoundException(`User #${userId} not found`);
        }
        return existingUser;
    }
    async deleteUser(userId) {
        const deletedUser = await this.userModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new common_1.NotFoundException(`User #${userId} not found`);
        }
        return deletedUser;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map