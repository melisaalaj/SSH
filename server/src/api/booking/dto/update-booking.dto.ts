import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { BookingStatus } from '../enums/bookingStatus.enum';

export class UpdateBookingDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  numberOfPeople: number

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  bookingTime: Date

  @IsOptional()
  @IsString()
  @ApiProperty()
  specialRequest: string

  @IsEnum(BookingStatus)
  @IsOptional()
  @ApiProperty()
  type: BookingStatus
}
