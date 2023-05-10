import { Body, Controller, Get, Param, ParseFilePipeBuilder, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { TrackService } from './track.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadTrackDto } from './dto/upload-track.dto';

@Controller('tracks')
@UseGuards(AuthGuard)
export class TrackController {
  constructor(private readonly audioTracksService: TrackService) {}

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
