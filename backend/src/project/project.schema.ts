import { Prop, Schema, SchemaFactory, } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Suggestion } from "src/suggestion/suggestion.schema";
import { Tag } from "src/tag/tag.schema";
import { Track } from "src/track/track.schema";
import { User } from "src/user/user.schema";
@Schema()
export class Project {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }] })
  tags: Tag[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Track' })
  masterTrack: Track;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Suggestion' }])
  suggestions: Suggestion[];
}
export const ProjectSchema = SchemaFactory.createForClass(Project);
