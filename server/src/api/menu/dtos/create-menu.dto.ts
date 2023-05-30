import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested } from 'class-validator';
import { CreateFoodDto } from 'src/api/food/dto/create-food';

export class CreateMenuDto {
  @IsString()
  @ApiProperty()
  name: string;
}
