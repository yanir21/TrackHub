import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TagSchema } from './tag.schema';


@Module({
  imports: [
  MongooseModule.forFeature([{ name: 'Tag', schema: TagSchema }]),
  ],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
