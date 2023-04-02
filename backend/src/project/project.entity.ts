import { Document } from "mongoose";
import { ITag } from "src/tag/tag.entity";
import { IUser } from "src/user/user.interface";

export interface IProject extends Document {
    _id: string,
    author: IUser,
    title: string,
    description: string,
    tags: ITag[],
}