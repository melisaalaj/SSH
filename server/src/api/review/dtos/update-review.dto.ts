import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  rating: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;
}
