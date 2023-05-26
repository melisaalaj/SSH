import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNumberString({}, { message: 'rating must be a valid decimal number' })
  @ApiProperty()
  rating: string;

  @IsString()
  @ApiProperty()
  description: string;
}
