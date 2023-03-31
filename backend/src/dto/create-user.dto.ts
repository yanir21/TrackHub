import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly username: string;
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly password: number;
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly displayname: number;
  @IsString()
  readonly imageurl: string;
}
