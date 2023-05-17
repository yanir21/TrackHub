import { Module } from '@nestjs/common';
import { SuggestionService } from './suggestion.service';
import { SuggestionController } from './suggestion.controller';
import { TrackModule } from 'src/track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SuggestionSchema } from './suggestion.schema';
import { UserModule } from 'src/user/user.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Suggestion', schema: SuggestionSchema }]),
    TrackModule,
    UserModule,
    ProjectModule
  ],
  controllers: [SuggestionController],
  providers: [SuggestionService]
})
export class SuggestionModule {}
