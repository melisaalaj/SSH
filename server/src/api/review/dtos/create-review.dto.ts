import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @Min(0)
  @Max(5)
  @IsNumber()
  @ApiProperty()
  rating: number;

  @IsString()
  @ApiProperty()
  description: string;
}
