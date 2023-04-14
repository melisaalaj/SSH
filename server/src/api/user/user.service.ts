/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { IUserService } from './interfaces/user.service.interface';
import { UserRepository } from './repository/user.repository';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { In } from 'typeorm';

@Injectable()
export class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}

  async findOne(userId: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ uuid: userId });
    if (!user) {
      throw new UnprocessableEntityException('This user does not exist!');
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(userId);
    await this.userRepository.update(user.id, updateUserDto);
    return await this.findOne(userId);
  }

  async remove(userId: string): Promise<void> {
    const user = await this.findOne(userId);
    await this.userRepository.remove(user);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(
      this.userRepository.create(createUserDto),
    );
  }

  async findUsersByIds(userIds: string[]): Promise<User[]> {
    const users = this.userRepository.find({
      where: { uuid: In(userIds) },
    });
    if (!users) throw new NotFoundException();
    return users;
  }
}
