import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Put,
    UploadedFile,
    ParseFilePipeBuilder,
    UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Username } from 'src/shared/decorators/username.decorator';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { TrackService } from 'src/track/track.service';
import { UploadTrackDto } from 'src/track/dto/upload-track.dto';

@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService,
        private readonly userService: UserService,
        private readonly trackService: TrackService
    ) {}

    @UseInterceptors(FileInterceptor('track'))
    @Post()
    async create(
        @Body() createProjectDto: CreateProjectDto,
        @Username() username: string,
        @UploadedFile(
            new ParseFilePipeBuilder()
              .addFileTypeValidator({
                fileType: 'audio/mpeg'
              })
              .build()) trackFile: Express.Multer.File,
    ) {
        const author = await this.userService.getUserByUsername(username);
        const uploadTrackDto: UploadTrackDto = {
            key: createProjectDto.trackKey
        };
        const track = await this.trackService.upload(uploadTrackDto, trackFile.buffer.toString());
        return await this.projectService.create(createProjectDto, author._id, track._id);
    }

    @Get()
    async findAll() {
        return await this.projectService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.projectService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateProjectDto: UpdateProjectDto
    ) {
        return await this.projectService.update(id, updateProjectDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.projectService.remove(id);
    }
}
