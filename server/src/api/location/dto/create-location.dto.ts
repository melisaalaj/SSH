import { IsNumber, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  city: string;

  @IsString()
  street: string;

  @IsNumber()
  postalCode: number;
}
