import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum} from 'class-validator';
import { DeliveryType } from 'src/api/delivery/enums/delivery-type.enum';

export class CreateDeliveryDto {
  @IsDateString()
  @ApiProperty()
  deliveryTime: Date

  @IsEnum(DeliveryType)
  @ApiProperty()
  type: DeliveryType
}
