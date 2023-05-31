import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSuggestionDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    projectId: string;
}
