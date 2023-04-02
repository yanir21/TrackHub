import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TagModule } from './tag/tag.module';
import { MongooseModule } from '@nestjs/mongoose';


const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://${username}:${password}@yanir-toar.0tfcqu7.mongodb.net/trackhub?retryWrites=true&w=majority`),
    UserModule,
    AuthModule,
    ProjectModule,
    TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
