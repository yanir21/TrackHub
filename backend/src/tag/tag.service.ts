import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ITag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(@InjectModel("Tag") private tagModel: Model<ITag>) {}

  async create(createTagDto: CreateTagDto) {
    const newTag = new this.tagModel(createTagDto);
    return newTag.save();
  }

  async findAll() {
    return await this.tagModel.find();
  }

  async findOne(id: string) {
    return await this.tagModel.findById(id);
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    return await this.tagModel.findByIdAndUpdate(
      id,
      updateTagDto,
      { new: true }
    );
  }

  async remove(id: string) {
    return await this.tagModel.findByIdAndDelete(id);
  }
}
