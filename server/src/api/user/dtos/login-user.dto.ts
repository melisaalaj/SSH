import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'melisa@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Melisa12*' })
  @IsNotEmpty()
  password: string;
}