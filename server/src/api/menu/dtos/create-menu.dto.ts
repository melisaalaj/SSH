import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsArray, ValidateNested } from "class-validator";
import { CreateFoodDto } from "src/api/food/dto/create-food";

export class CreateMenuDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({ type: CreateFoodDto, isArray: true })
  foods: CreateFoodDto[];
}

export class CreateMenuWithRestaurantDto {
  @IsString()
  @ApiProperty()
  restaurantName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({ type: CreateMenuDto })
  menu: CreateMenuDto;
}
