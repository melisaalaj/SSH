// remove eslint comment when you start to populate the interface
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserController {
  create(createUserDto: CreateUserDto): Promise<User>;

  findOne(userId: string): Promise<User>;

  findAll(): Promise<User[]>;

  updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User>;

  remove(userId: string): Promise<void>;
}
