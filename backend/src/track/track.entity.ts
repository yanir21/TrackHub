import { Document } from "mongoose";

export interface ITrack extends Document {
    _id: string,
    trackKey: string,
    file?: string
}