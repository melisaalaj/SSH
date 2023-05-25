import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ForgetPasswordDto {
    @IsEmail()
    @ApiProperty()
    @IsNotEmpty()
    email: string;
  }