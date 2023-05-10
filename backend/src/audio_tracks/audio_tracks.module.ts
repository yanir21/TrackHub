import { Module } from '@nestjs/common';
import { AudioTracksService } from './audio_tracks.service';
import { AudioTracksController } from './audio_tracks.controller';

@Module({
  controllers: [AudioTracksController],
  providers: [AudioTracksService]
})
export class AudioTracksModule {}
