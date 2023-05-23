/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Delete,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IUserController } from './interfaces/user.controller.interface';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { PaginationInterceptor } from 'src/common/interceptors/pagination.interceptor';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dtos/password-reset.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('user')
@ApiBearerAuth()
@ApiTags('User')
@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
export class UserController implements IUserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string): Promise<User> {
    return await this.usersService.findOne(userId);
  }

  @Get()
  @UseInterceptors(PaginationInterceptor)
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  async remove(@Param('userId') userId: string): Promise<void> {
    return await this.usersService.remove(userId);
  }
  @Public()
  @Post('forgot')
  async forgotPassword(
    @Body() forgotPassword: ForgotPasswordDto,
  ): Promise<void> {
    return await this.usersService.forgotPassword(forgotPassword);
  }

  @Public()
  @Post('reset/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    return await this.usersService.resetPassword(token, resetPasswordDto);
  }
}
