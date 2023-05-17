import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
// import { TrackController } from './track.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackSchema } from './track.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Track', schema: TrackSchema }]),
  ],
  // controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService]
})
export class TrackModule {}
