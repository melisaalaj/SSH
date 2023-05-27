import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant-entity';
import { PhotoService } from '../photo/photo.service';

describe('RestaurantController', () => {
  let controller: RestaurantController;
  let service: RestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantController],
      providers: [RestaurantService, PhotoService],
    }).compile();

    controller = module.get<RestaurantController>(RestaurantController);
    service = module.get<RestaurantService>(RestaurantService);
  });

  describe('create', () => {
    it('should create a new restaurant', async () => {
      const createRestaurantDto: CreateRestaurantDto = {
        name: 'Restaurant Name',
        description: 'Restaurant Description',
      };

      const createdRestaurant: Restaurant = {
        id: 1,
        name: 'Restaurant Name',
        description: 'Restaurant Description',
        email: '',
        photos: [],
        foods: [],
        locations: [],
        orders: [],
        products: [],
        deliveries: [],
        events: [],
        menus: [],
        bookings: [],
        reviews: [],
        uuid: '',
      };

      jest.spyOn(service, 'create').mockResolvedValueOnce(createdRestaurant);

      const result = await controller.create(createRestaurantDto);

      expect(result).toBe(createdRestaurant);
      expect(service.create).toHaveBeenCalledWith(createRestaurantDto);
    });
  });

  describe('update', () => {
    it('should update a restaurant', async () => {
      const id = '1';
      const updateRestaurantDto: UpdateRestaurantDto = {
        name: 'Updated Restaurant Name',
        description: 'Updated Restaurant Description',
        photoId: 0
      };
  
      jest.spyOn(service, 'update').mockResolvedValueOnce();
  
      await expect(controller.update(id, updateRestaurantDto)).resolves.toBeUndefined();
      expect(service.update).toHaveBeenCalledWith(id, updateRestaurantDto);
    });
  });
  
  describe('findOne', () => {
    it('should find a restaurant by ID', async () => {
      const id = '1';
      const foundRestaurant: Restaurant = {
        id: 1,
        name: 'Restaurant Name',
        description: 'Restaurant Description',
        email: '',
        photos: [],
        foods: [],
        locations: [],
        orders: [],
        products: [],
        deliveries: [],
        events: [],
        menus: [],
        bookings: [],
        reviews: [],
        uuid: '',
      };
  
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(foundRestaurant);
  
      const result = await controller.findOne(id);
  
      expect(result).toBe(foundRestaurant);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });
  
  describe('findOne', () => {
    it('should find a restaurant by ID', async () => {
      const id = '1';
      const foundRestaurant: Restaurant = {
        id: 1,
        name: 'Restaurant Name',
        description: 'Restaurant Description',
        email: '',
        photos: [],
        foods: [],
        locations: [],
        orders: [],
        products: [],
        deliveries: [],
        events: [],
        menus: [],
        bookings: [],
        reviews: [],
        uuid: '',
      };
  
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(foundRestaurant);
  
      const result = await controller.findOne(id);
  
      expect(result).toBe(foundRestaurant);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  
  describe('getLocation', () => {
    it('should get restaurants by name', async () => {
      const name = 'Restaurant Name';
      const foundRestaurants: Restaurant[] = [
        {
          id: 1,
          name: 'Restaurant Name',
          description: 'Restaurant Description',
          email: '',
          photos: [],
          foods: [],
          locations: [],
          orders: [],
          products: [],
          deliveries: [],
          events: [],
          menus: [],
          bookings: [],
          reviews: [],
          uuid: '',
        },
        // Add more Restaurant objects if needed
      ];
  
      jest.spyOn(service, 'findByName').mockResolvedValueOnce(foundRestaurants);
  
      const result = await controller.getLocation(name);
  
      expect(result).toBe(foundRestaurants);
      expect(service.findByName).toHaveBeenCalledWith(name);
    });
  });
    

  describe('remove', () => {
    it('should remove a restaurant', async () => {
      const id = '1';
  
      jest.spyOn(service, 'remove').mockResolvedValueOnce(undefined);
  
      await expect(controller.remove(id)).resolves.toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
  
  
  describe('getRestaurantInfo', () => {
    it('should get restaurant details', async () => {
      const id = '1';
      const restaurantInfo = {
        id: 1,
          name: 'Restaurant Name',
          description: 'Restaurant Description',
          email: '',
          photos: [],
          foods: [],
          locations: [],
          orders: [],
          products: [],
          deliveries: [],
          events: [],
          menus: [],
          bookings: [],
          reviews: [],
          uuid: '',
      };
  
      jest.spyOn(service, 'getRestaurantDetails').mockResolvedValueOnce(restaurantInfo);
  
      const result = await controller.getRestaurantInfo(id);
  
      expect(result).toBe(restaurantInfo);
      expect(service.getRestaurantDetails).toHaveBeenCalledWith(id);
    });
  });
  
});
