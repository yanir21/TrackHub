import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './project.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
    UserModule
    ],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
