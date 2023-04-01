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
const create_user_dto_1 = require("../../dto/create-user.dto");
const update_user_dto_1 = require("../../dto/update-user.dto");
const user_service_1 = require("../../service/user/user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(response, createUserDto) {
        try {
            const newUser = await this.userService.createUser(createUserDto);
            return response.status(common_1.HttpStatus.CREATED).json({
                message: "User has been created successfully",
                newUser,
            });
        }
        catch (err) {
            console.log(err);
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: "Error: User not created!",
                error: "Bad Request",
            });
        }
    }
    async updateUser(response, userId, updateUserDto) {
        try {
            const existingUser = await this.userService.updateUser(userId, updateUserDto);
            return response.status(common_1.HttpStatus.OK).json({
                message: "User has been successfully updated",
                existingUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async getUsers(response) {
        try {
            const userData = await this.userService.getAllUsers();
            return response.status(common_1.HttpStatus.OK).json({
                message: "All users data found successfully",
                userData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async getUser(response, userId) {
        try {
            const existingUser = await this.userService.getUser(userId);
            return response.status(common_1.HttpStatus.OK).json({
                message: "User found successfully",
                existingUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async deleteUser(response, userId) {
        try {
            const deletedUser = await this.userService.deleteUser(userId);
            return response.status(common_1.HttpStatus.OK).json({
                message: "User deleted successfully",
                deletedUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
};
__decorate([
    (0, common_1.Post)("/register"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)("/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map