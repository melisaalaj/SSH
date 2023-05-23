import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<User>;

  findOne(userId: string): Promise<User>;

  findAll(): Promise<User[]>;

  update(userId: string, updateUserDto: UpdateUserDto): Promise<User>;

  remove(userId: string): Promise<void>;

  findByEmail(email: string): Promise<User>;
}