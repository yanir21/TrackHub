import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UseGuards,
    UploadedFile,
    ParseFilePipeBuilder,
    UseInterceptors,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { SuggestionService } from './suggestion.service';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { UpdateSuggestionStatusDto } from './dto/update-suggestion-status.dto';
import { Username } from 'src/shared/decorators/username.decorator';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { TrackService } from 'src/track/track.service';
import { UploadTrackDto } from 'src/track/dto/upload-track.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProjectService } from 'src/project/project.service';

@Controller('suggestions')
@UseGuards(AuthGuard)
export class SuggestionController {
    constructor(
        private readonly suggestionService: SuggestionService,
        private readonly userService: UserService,
        private readonly trackService: TrackService,
        private readonly projectService: ProjectService
    ) {}

    @UseInterceptors(FileInterceptor('track'))
    @Post()
    async create(
        @Body() createSuggestionDto: CreateSuggestionDto,
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
        const suggester = await this.userService.getUserByUsername(username);
        const uniqId = require('uniqid');
        const uploadTrackDto: UploadTrackDto = {
            key: uniqId()
        };
        const track = await this.trackService.upload(
            uploadTrackDto,
            trackFile.buffer
        );
        const newSuggestion = await this.suggestionService.create(
            createSuggestionDto,
            suggester._id,
            track._id
        );
        await this.projectService.addSuggestion(
            createSuggestionDto.projectId,
            newSuggestion
        );

        return newSuggestion;
    }

    @Get('/user/:id')
    async findAllOfUser(@Param('id') userId: string) {
        const suggestions = await this.suggestionService.findAllOfUser(userId);
        const distinctProjects = [
            ...new Set(suggestions.map((suggestion) => suggestion.project))
        ];
        return Promise.all(
            distinctProjects.map(async (project) => {
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

    @Put('/:id')
    async update(
        @Param('id') id: string,
        @Body() updateSuggestionStatusDto: UpdateSuggestionStatusDto,
        @Username() username: string
    ) {
        if (await this.isAllowedToUpdateStatus(id, username)) {
            return await this.suggestionService.updateStatus(
                id,
                updateSuggestionStatusDto
            );
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    private async isAllowedToUpdateStatus(
        id: string,
        username: string
    ): Promise<boolean> {
        const suggestion = await this.suggestionService.findOne(id);
        return (
            (await this.projectService.findOne(suggestion.project._id)).author
                .username === username
        );
    }
}
