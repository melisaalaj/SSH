import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { User } from '../entities/user.entity';
import { UserRoles } from '../enums/roles.enum';
import { UserGender } from '../enums/userGender.enum';
import { IsUnique } from 'src/common/decorators/validation.decorator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'Melisa' })
  firstName: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @Validate(IsUnique, [User])
  @ApiProperty()
  email: string;

  @IsString()
  @Validate(IsUnique, [User])
  @ApiProperty()
  username: string;

  @IsEnum(UserGender)
  @ApiProperty()
  gender: UserGender;

  @IsString()
  @IsOptional()
  @ApiProperty()
  phone: string;

  @IsEnum(UserRoles)
  @ApiProperty()
  role: number;
}
