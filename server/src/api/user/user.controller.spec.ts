import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserRoles } from './enums/roles.enum';
import { UserGender } from './enums/userGender.enum';
import { Order } from '../order/entities/orders-entity';
import { Booking } from '../booking/entities/booking-entity';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        username: 'johndoe',
        password: '9*****',
        gender: UserGender.MALE,
        phone: '1234567890',
        role: UserRoles.ADMIN,
      };

      const createdUser: User = {
        id: 1,
        isRoleOverridden: false,
        hashedRt: 'hashedRt',
        birthdate: new Date('1990-01-01'),
        stripeCustomerId: 'stripeCustomerId',
        ...createUserDto,
        orders: new Order(),
        contacts: [],
        bookings: new Booking(),
        reviews: [],
        created_at: undefined,
        updated_at: undefined,
        deleted_at: undefined,
        uuid: '123',
      };

      jest.spyOn(userService, 'create').mockResolvedValueOnce(createdUser);

      const result = await controller.create(createUserDto);

      expect(userService.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toBe(createdUser);
    });
  });

  describe('findOne', () => {
    it('should find a user by ID', async () => {
      const userId = '123';
      const foundUser: User = {
        role: UserRoles.ADMIN,
        isRoleOverridden: false,
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        hashedRt: '',
        gender: UserGender.MALE,
        phone: '',
        birthdate: undefined,
        stripeCustomerId: '',
        orders: new Order(),
        contacts: [],
        bookings: new Booking(),
        reviews: [],
        created_at: undefined,
        updated_at: undefined,
        deleted_at: undefined,
        id: 0,
        uuid: '',
      };

      jest.spyOn(userService, 'findOne').mockResolvedValueOnce(foundUser);

      const result = await controller.findOne(userId);

      expect(userService.findOne).toHaveBeenCalledWith(userId);
      expect(result).toBe(foundUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          role: UserRoles.ADMIN,
          isRoleOverridden: false,
          firstName: '',
          lastName: '',
          email: '',
          username: '',
          password: '',
          hashedRt: '',
          gender: UserGender.MALE,
          phone: '',
          birthdate: undefined,
          stripeCustomerId: '',
          orders: new Order(),
          contacts: [],
          bookings: new Booking(),
          reviews: [],
          created_at: undefined,
          updated_at: undefined,
          deleted_at: undefined,
          id: 0,
          uuid: '',
        },
      ];

      jest.spyOn(userService, 'findAll').mockResolvedValueOnce(users);

      const result = await controller.findAll();

      expect(userService.findAll).toHaveBeenCalled();
      expect(result).toBe(users);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const userId = '123';
      const updateUserDto: UpdateUserDto = {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        gender: UserGender.MALE,
        phone: '',
        role: 0,
      };
      const updatedUser: User = {
        role: UserRoles.ADMIN,
        isRoleOverridden: false,
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        hashedRt: '',
        gender: UserGender.MALE,
        phone: '',
        birthdate: undefined,
        stripeCustomerId: '',
        orders: new Order(),
        contacts: [],
        bookings: new Booking(),
        reviews: [],
        created_at: undefined,
        updated_at: undefined,
        deleted_at: undefined,
        id: 0,
        uuid: '',
      };

      jest.spyOn(userService, 'update').mockResolvedValueOnce(updatedUser);

      const result = await controller.updateUser(userId, updateUserDto);

      expect(userService.update).toHaveBeenCalledWith(userId, updateUserDto);
      expect(result).toBe(updatedUser);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const userId = '123';

      jest.spyOn(userService, 'remove').mockResolvedValueOnce();

      const result = await controller.remove(userId);

      expect(userService.remove).toHaveBeenCalledWith(userId);
      expect(result).toBeUndefined();
    });
  });
});
