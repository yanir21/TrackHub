import { Prop, Schema, SchemaFactory, } from "@nestjs/mongoose";


@Schema()
export class Track {

  @Prop()
  trackKey: string;
  
  file?: string;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
