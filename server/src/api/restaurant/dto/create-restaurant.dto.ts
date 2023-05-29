import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

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

export class CreateRestaurantDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @ValidateNested()
  @Type(() => CreateLocationDto)
  @ApiProperty({ required: false, type: CreateLocationDto })
  location?: CreateLocationDto;
}
