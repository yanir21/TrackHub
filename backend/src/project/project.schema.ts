import { Prop, Schema, SchemaFactory, } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Tag } from "src/tag/tag.schema";
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
}
export const ProjectSchema = SchemaFactory.createForClass(Project);
