import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';
import { BookingStatus } from '../enums/bookingStatus.enum';

export class CreateBookingDto {
  @IsNumber()
  @ApiProperty()
  numberOfPeople: number

  @IsDateString()
  @ApiProperty()
  bookingTime: Date

  @IsString()
  @ApiProperty()
  specialRequest: string

  @IsEnum(BookingStatus)
  @ApiProperty()
  type: BookingStatus
}
