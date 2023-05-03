import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLocationDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  city: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  street: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  postalCode: number;
}
