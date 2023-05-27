import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { NotFoundException, UnprocessableEntityException } from '@nestjs/common/exceptions';
import { Repository } from 'typeorm';
import { UserGender } from './enums/userGender.enum';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserRoles } from './enums/roles.enum';


describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository, 
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('should create a new user', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        username: 'johndoe',
        password: 'password',
        gender: UserGender.MALE,
        phone: '044 589 589',
        role: 2
      };
      const expectedUser = new User();

      userRepository.save = jest.fn().mockResolvedValue(expectedUser);

      const result = await service.create(createUserDto);

      expect(result).toBe(expectedUser);
      expect(userRepository.save).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findOne', () => {
    it('should find a user by userId', async () => {

      const userId = '123';
      const expectedUser = new User();
 
      userRepository.findOne = jest.fn().mockResolvedValue(expectedUser);

      const result = await service.findOne(userId);

      expect(result).toBe(expectedUser);
      expect(userRepository.findOne).toHaveBeenCalledWith({ uuid: userId });
    });

    it('should throw an exception when the user does not exist', async () => {

      const userId = '123';

      userRepository.findOne = jest.fn().mockResolvedValue(undefined);

      await expect(service.findOne(userId)).rejects.toThrow(UnprocessableEntityException);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedUsers: User[] = [
        new User(),
        new User(),
      ];

      userRepository.find = jest.fn().mockResolvedValue(expectedUsers);

      const result = await service.findAll();

      expect(result).toEqual(expectedUsers);
      expect(userRepository.find).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a user and return the updated user', async () => {
      const userId = '123';
      const updateUserDto: UpdateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        username: 'johndoe',
        gender: UserGender.MALE,
        phone: '987654321',
        role: UserRoles.ADMIN,
      };
      const originalUser = new User();
      const updatedUser = new User();

      userRepository.findOne = jest.fn().mockResolvedValue(originalUser);
      userRepository.update = jest.fn().mockResolvedValue({ affected: 1 });
      userRepository.findOneOrFail = jest.fn().mockResolvedValue(updatedUser);
  
      const result = await service.update(userId, updateUserDto);

      expect(result).toBe(updatedUser);
      expect(userRepository.findOne).toHaveBeenCalledWith({ uuid: userId });
      expect(userRepository.update).toHaveBeenCalledWith(originalUser.id, updateUserDto);
      expect(userRepository.findOneOrFail).toHaveBeenCalledWith({ uuid: userId });
    });
  
    it('should throw an exception when the user does not exist', async () => {
      const userId = '123';
      const updateUserDto: UpdateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        username: 'johndoe',
        gender: UserGender.MALE,
        phone: '987654321',
        role: UserRoles.ADMIN,
      };

      userRepository.findOne = jest.fn().mockResolvedValue(undefined);

      await expect(service.update(userId, updateUserDto)).rejects.toThrow(UnprocessableEntityException);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const userId = '123';
      const user = new User();

      userRepository.findOne = jest.fn().mockResolvedValue(user);
      userRepository.remove = jest.fn().mockResolvedValue(undefined);

      await service.remove(userId);

      expect(userRepository.findOne).toHaveBeenCalledWith({ uuid: userId });
      expect(userRepository.remove).toHaveBeenCalledWith(user);
    });

    it('should throw an exception when the user does not exist', async () => {
      const userId = '123';

      userRepository.findOne = jest.fn().mockResolvedValue(undefined);

      await expect(service.remove(userId)).rejects.toThrow(UnprocessableEntityException);
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      // Arrange
      const email = 'johndoe@example.com';
      const expectedUser = new User();
      userRepository.findOne = jest.fn().mockResolvedValue(expectedUser);

      // Act
      const result = await service.findByEmail(email);

      // Assert
      expect(result).toBe(expectedUser);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email } });
    });

    it('should throw an exception when the user does not exist', async () => {
      const email = 'nonexistent@example.com';
      userRepository.findOne = jest.fn().mockResolvedValue(undefined);

      await expect(service.findByEmail(email)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findUsersByIds', () => {
    it('should find users by ids', async () => {
      const userIds = ['123', '456', '789'];
      const expectedUsers = [new User(), new User(), new User()];
      userRepository.find = jest.fn().mockResolvedValue(expectedUsers);

      const result = await service.findUsersByIds(userIds);

      expect(result).toBe(expectedUsers);
      expect(userRepository.find).toHaveBeenCalledWith({ where: { uuid: { $in: userIds } } });
    });

    it('should throw an exception when no users are found', async () => {
      const userIds = ['123', '456', '789'];
      userRepository.find = jest.fn().mockResolvedValue([]);

      await expect(service.findUsersByIds(userIds)).rejects.toThrow(NotFoundException);
    });
  });
});
