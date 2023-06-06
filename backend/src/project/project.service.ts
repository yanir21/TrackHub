import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { ISuggestion } from 'src/suggestion/suggestion.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { IProject } from './project.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel('Project') private projectModel: Model<IProject>
    ) {}

    async create(
        createProjectDto: CreateProjectDto,
        author: string,
        trackId: string
    ) {
        createProjectDto.tags.forEach((tag) => {
            if (!isValidObjectId(tag)) {
                throw new NotFoundException(`Tag ${tag} not found`);
            }
        });

        const newProject = new this.projectModel({
            author,
            masterTrack: trackId,
            suggestions: [],
            ...createProjectDto
        });
        return await newProject.save();
    }

    async addSuggestion(projectId: string, suggestion: ISuggestion) {
        const project = await this.projectModel.findById(projectId);
        project.suggestions.push(suggestion);

        return await project.save();
    }

    async findAll() {
        return await this.projectModel
            .find()
            .populate('author tags masterTrack suggestions')
            .populate({
                path: 'suggestions',
                populate: {
                    path: 'track'
                }
            })
            .lean();
    }

    async findAllOfUser(userId: string) {
        return await this.projectModel
            .find({ author: userId })
            .populate('author tags suggestions')
            .populate({
                path: 'suggestions',
                populate: {
                    path: 'track'
                }
            })
            .lean();
    }

    async findOne(id: string) {
        return await this.projectModel
            .findById(id)
            .populate('author tags masterTrack suggestions suggestions')
            .populate({
                path: 'suggestions',
                populate: {
                    path: 'track suggester'
                }
            })
            .lean();
    }

    async findOneBySuggestionId(suggestionId: string): Promise<IProject> {
        return await this.projectModel
            .where('suggestions._id')
            .in([suggestionId])
            .lean()[0];
    }

    async update(id: string, updateProjectDto: UpdateProjectDto) {
        return await this.projectModel.findByIdAndUpdate(id, updateProjectDto, {
            new: true
        });
    }

    async remove(id: string) {
        return await this.projectModel.findByIdAndDelete(id);
    }
}
