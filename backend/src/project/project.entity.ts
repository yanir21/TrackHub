import { Document } from "mongoose";
import { ISuggestion } from "src/suggestion/suggestion.entity";
import { ITag } from "src/tag/tag.entity";
import { ITrack } from "src/track/track.entity";
import { IUser } from "src/user/user.interface";

export interface IProject extends Document {
    _id: string,
    author: IUser,
    title: string,
    description: string,
    tags: ITag[],
    masterTrack: ITrack,
    suggestions: ISuggestion[]
}