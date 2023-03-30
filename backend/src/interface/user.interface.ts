import { Document } from 'mongoose';
export interface IUser extends Document{
    readonly username: string;
    readonly password: string;
    readonly displayname: string;
    readonly imageurl: string;
}