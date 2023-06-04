import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { DeliveryType } from '../../../api/delivery/enums/delivery-type.enum';

export class UpdateDeliveryDto {
  @IsDateString()
  @IsOptional()
  @ApiProperty()
  deliveryTime: Date;

  @IsEnum(DeliveryType)
  @IsOptional()
  @ApiProperty()
  type: DeliveryType;
}
