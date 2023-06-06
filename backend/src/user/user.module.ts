import 'dotenv/config';
import { Module } from '@nestjs/common';
import { UserSchema } from './user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
    imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
