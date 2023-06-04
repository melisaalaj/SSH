import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsArray, ValidateNested, IsOptional } from "class-validator";
import { UpdateFoodDto } from "../../../api/food/dto/update-food";

export class UpdateMenuDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @ApiProperty({ type: UpdateFoodDto, isArray: true})
  foods: UpdateFoodDto[];
}

export class UpdateMenuWithRestaurantDto {
  @IsString()
  @ApiProperty()
  restaurantName: string;

  @IsArray()
  @ValidateNested({each: true})
  @ApiProperty({ type: UpdateMenuDto})
  @IsOptional()
  menu: UpdateMenuDto;
}