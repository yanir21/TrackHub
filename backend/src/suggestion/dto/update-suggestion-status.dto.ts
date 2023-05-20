import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { SuggestionStatus } from "../suggestion.entity";

export class UpdateSuggestionStatusDto {
    @IsEnum(SuggestionStatus)
    @IsNotEmpty()
    status: SuggestionStatus;
}
