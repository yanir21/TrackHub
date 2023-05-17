import { Document } from "mongoose";
import { ITrack } from "src/track/track.entity";
import { IUser } from "src/user/user.interface";

export enum SuggestionStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REGECTED = "rejected"
}

export interface ISuggestion extends Document {
    _id: string,
    suggester: IUser,
    description: string,
    creationDate: Date,
    track: ITrack,
    status: SuggestionStatus
}