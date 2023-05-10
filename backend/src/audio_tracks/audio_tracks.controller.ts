import { Body, Controller, Get, Param, ParseFilePipeBuilder, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { AudioTracksService } from './audio_tracks.service';
import { S3 } from "@aws-sdk/client-s3"
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadTrackDto } from './dto/upload-track.dto';

@Controller('audio-tracks')
@UseGuards(AuthGuard)
export class AudioTracksController {
  constructor(private readonly audioTracksService: AudioTracksService) {}

  @UseInterceptors(FileInterceptor('track'))
  @Post()
  async upload(
    @Body() uploadTrackDto: UploadTrackDto,
    @User() username: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'audio/mpeg'
        })
        .build()) track: Express.Multer.File,
  ) {
      return await this.audioTracksService.upload(uploadTrackDto, track.buffer.toString());
  }

  @Get(':id')
  async getTrack(@Param('id') key: string) {
    return await this.audioTracksService.getTrack(key);
  }
}
