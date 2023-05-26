import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @ApiProperty()
  street: string;

  @IsNumber()
  @ApiProperty()
  postalCode: number;
}
