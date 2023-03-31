import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema()
export class User {
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  displayname: string;
  @Prop()
  imageurl: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
