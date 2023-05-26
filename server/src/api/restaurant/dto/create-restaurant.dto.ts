import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;
}
