import { IsEnum } from "class-validator";
import { SuggestionStatus } from "../suggestion.entity";

export class UpdateSuggestionStatusDto {
    @IsEnum(SuggestionStatus)
    status: SuggestionStatus;
}
