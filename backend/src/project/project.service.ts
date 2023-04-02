import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { IProject } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(@InjectModel("Project") private projectModel: Model<IProject>) {}

  async create(createProjectDto: CreateProjectDto, author: string) {
    createProjectDto.tags.forEach(tag => {
      if (!isValidObjectId(tag)) {
        throw new NotFoundException(`Tag ${tag} not found`);
      }
    })

    const newProject = new this.projectModel({...createProjectDto, author});
    return newProject.save();
  }

  async findAll() {
    return await this.projectModel.find().populate("author tags");
  }

  async findOne(id: string) {
    return await this.projectModel.findById(id).populate("author tags");
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return await this.projectModel.findByIdAndUpdate(
      id,
      updateProjectDto,
      { new: true }
    );
  }

  async remove(id: string) {
    return await this.projectModel.findByIdAndDelete(id);
  }
}
