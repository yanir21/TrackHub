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
    UseInterceptors
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
                .build()
        )
        trackFile: Express.Multer.File
    ) {
        const author = await this.userService.getUserByUsername(username);
        const uniqId = require('uniqid');

        const uploadTrackDto: UploadTrackDto = {
            key: `${uniqId()}.mp3`
        };
        const track = await this.trackService.upload(
            uploadTrackDto,
            trackFile.buffer
        );
        return await this.projectService.create(
            createProjectDto,
            author._id,
            track._id
        );
    }

    @Get()
    // TODO: add skip and limit
    async findAll() {
        const projects = await this.projectService.findAll();
        return Promise.all(
            projects.map(async (project) => {
                // TODO: remove this if clause, when the data is correct
                if (project.masterTrack) {
                    project.masterTrack.url =
                        await this.trackService.getTrackUrlById(
                            project.masterTrack._id
                        );
                }
                return project;
            })
        );
    }

    @Get('user/:id')
    // TODO: add skip and limit
    async findAllOfUser(@Param('id') userId: string) {
        const projects = await this.projectService.findAllOfUser(userId);

        return Promise.all(
            projects.map(async (project) => {
                // TODO: remove this if clause, when the data is correct
                if (project.masterTrack) {
                    project.masterTrack.url =
                        await this.trackService.getTrackUrlById(
                            project.masterTrack._id
                        );
                }
                return project;
            })
        );
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const project = await this.projectService.findOne(id);
        const trackFile = await this.trackService.getTrackUrlById(
            project.masterTrack._id
        );
        project.masterTrack.url = trackFile;
        project.suggestions = await Promise.all(
            project.suggestions.map(async (suggestion) => {
                // TODO: remove this if clause, when the data is correct
                if (suggestion.track) {
                    suggestion.track.url =
                        await this.trackService.getTrackUrlById(
                            suggestion.track._id
                        );
                }
                return suggestion;
            })
        );
        return project;
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
