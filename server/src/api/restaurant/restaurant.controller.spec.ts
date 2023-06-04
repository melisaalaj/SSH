import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant-entity';
import { PhotoService } from '../photo/photo.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Photo } from '../photo/entities/photo-entity';
import { LocationService } from '../location/location.service';
import { Location  } from '../location/entities/location-entity';

describe('RestaurantController', () => {
  let service: RestaurantService;
  let controller: RestaurantController;
  let repository: Repository<Restaurant>;
  let photoService: PhotoService;
  let locationService: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantController],
      providers: [
        RestaurantService,
        PhotoService,
        LocationService,
        {
          provide: getRepositoryToken(Restaurant),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Photo),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Location),
          useClass: Repository,
        },
        JwtService,
      ],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
    repository = module.get<Repository<Restaurant>>(
      getRepositoryToken(Restaurant),
    );
    controller = module.get<RestaurantController>(RestaurantController);
    photoService = module.get<PhotoService>(PhotoService);
    locationService = module.get<LocationService>(LocationService);
  });

  describe('create', () => {
    it('should create a new restaurant', async () => {
      const createRestaurantDto: CreateRestaurantDto = {
        name: 'Restaurant Name',
        description: 'Restaurant Description',
        uuid: '',
        email: '',
        image: undefined,
      };

      const createdRestaurant: Restaurant = {
        id: 1,
        name: 'Restaurant Name',
        description: 'Restaurant Description',
        email: '',
        photos: [],
        locations: [],
        orders: [],
        deliveries: [],
        events: [],
        menus: [],
        bookings: [],
        reviews: [],
        uuid: '',
        image: undefined,
      };

      jest.spyOn(service, 'create').mockResolvedValueOnce(createdRestaurant);

      const result = await controller.create(createRestaurantDto, undefined);

      expect(result).toBe(createdRestaurant);
      expect(service.create).toHaveBeenCalledWith(createRestaurantDto);
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
        locations: [],
        orders: [],
        deliveries: [],
        events: [],
        menus: [],
        bookings: [],
        reviews: [],
        uuid: '',
        image: undefined,
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
        locations: [],
        orders: [],
        deliveries: [],
        events: [],
        menus: [],
        bookings: [],
        reviews: [],
        uuid: '',
        image: undefined,
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
          locations: [],
          orders: [],
          deliveries: [],
          events: [],
          menus: [],
          bookings: [],
          reviews: [],
          uuid: '',
          image: undefined,
        },
      ];

      jest.spyOn(service, 'findByName').mockResolvedValueOnce(foundRestaurants);

      const result = await controller.getLocation(name);

      expect(result).toBe(foundRestaurants);
      expect(service.findByName).toHaveBeenCalledWith(name);
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
        image: undefined,
      };

      jest
        .spyOn(service, 'getRestaurantDetails')
        .mockResolvedValueOnce(restaurantInfo);

      const result = await controller.getRestaurantInfo(id);

      expect(result).toBe(restaurantInfo);
      expect(service.getRestaurantDetails).toHaveBeenCalledWith(id);
    });
  });
});
