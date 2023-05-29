import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @ApiProperty()
  street: string;

  @IsString()
  @ApiProperty()
  postalCode: string;
}
