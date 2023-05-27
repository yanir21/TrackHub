import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { UpdateSuggestionStatusDto } from './dto/update-suggestion-status.dto';
import { ISuggestion, SuggestionStatus } from './suggestion.entity';

@Injectable()
export class SuggestionService {
  constructor(@InjectModel("Suggestion") private suggestionModel: Model<ISuggestion>) {}
  
  async create(createSuggestionDto: CreateSuggestionDto,
    suggesterId: string,
    trackId: string
    ): Promise<ISuggestion> {
    const newSuggestion = new this.suggestionModel({
      suggester: suggesterId,
      creationDate: new Date(),
      status: SuggestionStatus.PENDING,
      track: trackId,
      description: createSuggestionDto.description,
      project: createSuggestionDto.projectId
    });

    return await newSuggestion.save();
  }

  async findOne(id: string) {
    return this.suggestionModel.findById(id).lean();
  }

  async findAllOfUser(suggesterId: string) {
    return await this.suggestionModel.find({suggester: suggesterId}).populate("suggester track").lean();
  }

  async updateStatus(id: string, updateSuggestionStatusDto: UpdateSuggestionStatusDto) {
    return await this.suggestionModel.findByIdAndUpdate(
      id,
      updateSuggestionStatusDto,
      { new: true }
    );
  }
}