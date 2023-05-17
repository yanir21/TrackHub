// import { Body, Controller, Get, Param, ParseFilePipeBuilder, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
// import { AuthGuard } from 'src/auth/auth.guard';
// import { Username } from 'src/shared/decorators/username.decorator';
// import { TrackService } from './track.service';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { UploadTrackDto } from './dto/upload-track.dto';


// // TODO: maybe remove this coontroller and only export track.service to suggestion and project controllers
// @Controller('tracks')
// @UseGuards(AuthGuard)
// export class TrackController {
//   constructor(private readonly audioTracksService: TrackService) {}

//   @UseInterceptors(FileInterceptor('track'))
//   @Post()
//   async upload(
//     @Body() uploadTrackDto: UploadTrackDto,
//     @Username() username: string,
//     @UploadedFile(
//       new ParseFilePipeBuilder()
//         .addFileTypeValidator({
//           fileType: 'audio/mpeg'
//         })
//         .build()) track: Express.Multer.File,
//   ) {
//       return await this.audioTracksService.upload(uploadTrackDto, track.buffer.toString());
//   }

//   @Get(':id')
//   async getTrack(@Param('id') key: string) {
//     return await this.audioTracksService.getTrack(key);
//   }
// }
