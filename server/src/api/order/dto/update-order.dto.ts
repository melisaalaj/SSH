import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsDateString()
  @ApiProperty()
  arrivalTime: Date;

  @IsOptional()
  @IsString()
  @ApiProperty()
  price: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  orderConfimation: boolean;
}
