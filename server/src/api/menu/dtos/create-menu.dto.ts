import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @ApiProperty()
  name: string;
}
