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
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IUserController } from './interfaces/user.controller.interface';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { PaginationInterceptor } from 'src/common/interceptors/pagination.interceptor';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorato';
import { UserRoles } from './enums/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard, RolesGuard)
export class UserController implements IUserController {
  constructor(private readonly usersService: UserService) {}

  @Roles(UserRoles.ADMIN)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Roles(UserRoles.ADMIN)
  @Get(':userId')
  async findOne(@Param('userId') userId: string): Promise<User> {
    return await this.usersService.findOne(userId);
  }

  @Roles(UserRoles.ADMIN)
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

  @Roles(UserRoles.ADMIN)
  @Delete(':userId')
  async remove(@Param('userId') userId: string): Promise<void> {
    return await this.usersService.remove(userId);
  }
}
