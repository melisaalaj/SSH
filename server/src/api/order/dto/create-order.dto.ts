import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsDateString, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsDateString()
  @ApiProperty()
  arrivalTime: Date;

  @IsString()
  @ApiProperty()
  price: string;

  @IsBoolean()
  @ApiProperty()
  orderConfirmation: boolean;
}