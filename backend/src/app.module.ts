import "dotenv/config";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserSchema } from "./schema/user.schema";
import { UserService } from "./service/user/user.service";
import { UserController } from "./controller/user/user.controller";

const dbUsername = process.env.MONGO_USERNAME;
const dbPassword = process.env.MONGO_PASSWORD;
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${dbUsername}:${dbPassword}@yanir-toar.0tfcqu7.mongodb.net/trackhub?retryWrites=true&w=majority`
    ),
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
