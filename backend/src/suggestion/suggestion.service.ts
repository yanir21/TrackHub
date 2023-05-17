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
      description: createSuggestionDto.description
    });

    return await newSuggestion.save();
  }

  async findAllOfUser(suggesterId: string) {
    return await this.suggestionModel.find({suggester: suggesterId}).populate("suggester track");
  }

  // TODO: allow only project owner to update status
  async updateStatus(id: string, updateSuggestionStatusDto: UpdateSuggestionStatusDto) {
    return await this.suggestionModel.findByIdAndUpdate(
      id,
      updateSuggestionStatusDto,
      { new: true }
    );
  }
  // update(id: number, updateSuggestionDto: UpdateSuggestionDto) {
  //   return `This action updates a #${id} suggestion`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} suggestion`;
  // }
}
