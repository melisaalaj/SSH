import { IsOptional, IsString } from 'class-validator';

export class UpdateRestaurantDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
