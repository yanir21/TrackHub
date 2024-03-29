"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
require("dotenv/config");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const project_module_1 = require("./project/project.module");
const tag_module_1 = require("./tag/tag.module");
const mongoose_1 = require("@nestjs/mongoose");
const track_module_1 = require("./track/track.module");
const suggestion_module_1 = require("./suggestion/suggestion.module");
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(`mongodb+srv://${username}:${password}@yanir-toar.0tfcqu7.mongodb.net/trackhub?retryWrites=true&w=majority`),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            project_module_1.ProjectModule,
            tag_module_1.TagModule,
            track_module_1.TrackModule,
            suggestion_module_1.SuggestionModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map