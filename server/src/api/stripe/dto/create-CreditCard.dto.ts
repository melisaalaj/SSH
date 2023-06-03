import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddCreditCardDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cvc: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  exp_month: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  exp_year: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  zip: string;
}

export class ChargeProductDto {
  @ApiProperty({ type: String })
  productId: string;

  @ApiProperty({ type: Number })
  amount: number;
}

export class ChargeByProductDto {
  @ApiProperty()
  card: AddCreditCardDto;

  @ApiProperty({ type: [ChargeProductDto] })
  products: ChargeProductDto[];
}
