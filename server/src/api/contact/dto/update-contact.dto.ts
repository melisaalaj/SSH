import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateContactDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  phoneNumber: string;

  @IsOptional()
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  message: string;
}
