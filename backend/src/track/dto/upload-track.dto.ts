import { IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UploadTrackDto {
    @IsString()
    @IsNotEmpty()
    key: string;
}
