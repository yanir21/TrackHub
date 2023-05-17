import { Prop, Schema, SchemaFactory, } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

@Schema()
export class Track {

  @Prop()
  trackKey: string;
  
}

export const TrackSchema = SchemaFactory.createForClass(Track);
