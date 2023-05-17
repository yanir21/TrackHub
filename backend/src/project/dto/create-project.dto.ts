import { IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateProjectDto {
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    tags: string[];
}
