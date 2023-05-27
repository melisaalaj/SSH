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
