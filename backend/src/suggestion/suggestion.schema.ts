import { Prop, Schema, SchemaFactory, } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Track } from "src/track/track.schema";
import { User } from "src/user/user.schema";
import { SuggestionStatus } from "./suggestion.entity";

@Schema()
export class Suggestion {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  suggester: User;

  @Prop()
  description: string;

  @Prop()
  creationDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Track' })
  track: Track;

  @Prop()
  status: SuggestionStatus;
}
export const SuggestionSchema = SchemaFactory.createForClass(Suggestion);
