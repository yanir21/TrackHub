import 'dotenv/config';
import { Module } from '@nestjs/common';
import { UserSchema } from './user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

console.log(username, password);


@Module({
    imports: [MongooseModule.forRoot(`mongodb+srv://${username}:${password}@yanir-toar.0tfcqu7.mongodb.net/trackhub?retryWrites=true&w=majority`),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
