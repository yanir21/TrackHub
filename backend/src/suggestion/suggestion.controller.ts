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

    @Get()
    async findAllOfUser(@Username() username: string) {
        const suggester = await this.userService.getUserByUsername(username);
        const suggestions = await this.suggestionService.findAllOfUser(
            suggester._id
        );
        return Promise.all(
            suggestions.map(async (suggestion) => {
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
