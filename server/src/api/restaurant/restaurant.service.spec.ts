import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant-entity';
import { Photo } from '../photo/entities/photo-entity';
import { Readable } from 'stream';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from '../review/entities/review-entity';
import { LocationService } from '../location/location.service';

describe('RestaurantService', () => {
  let service: RestaurantService;
  let repository: Repository<Restaurant>;
  let locationService: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantService,
        LocationService,
        {
          provide: getRepositoryToken(Restaurant),
          useClass: Repository, // Update this line with the actual repository class
        },
        {
          provide: LocationService,
          useValue: {
            findOne: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
    repository = module.get<Repository<Restaurant>>(
      getRepositoryToken(Restaurant),
    );
    locationService = module.get<LocationService>(LocationService);
  });

  describe('create', () => {
    it('should create a new restaurant', async () => {
      const createDto: CreateRestaurantDto = {
        name: 'Restaurant Name',
        description: 'Restaurant Description',
        uuid: '',
        email: '',
        image: undefined,
      };
      const saveSpy = jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(createDto as any);

      const result = await service.create(createDto);

      expect(result).toEqual(createDto);
      expect(saveSpy).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findOne', () => {
    it('should find a restaurant by ID', async () => {
      const id = '1';
      const restaurant: Restaurant = {
        id: 1,
        name: 'Restaurant Name',
        description: 'Restaurant Description',
        email: '',
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
      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValueOnce(restaurant);
  
      const result = await service.findOne(id);
  
      console.log('Expected argument:', { where: { id: parseInt(id) }, relations: ['locations'] });
      console.log('Actual argument:', findOneSpy.mock.calls[0][0]);
  
      expect(result).toEqual(restaurant);
      expect(findOneSpy).toHaveBeenCalledWith({ where: { id: parseInt(id) }, relations: ['locations'] });
    });
  });
  
  describe('remove', () => {
    it('should remove a restaurant', async () => {
      const id = '1';
      const restaurant: Restaurant = {
        id: 1,
        name: 'Restaurant Name',
        description: 'Restaurant Description',
        email: '',
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
      const findOneSpy = jest
        .spyOn(service, 'findOne')
        .mockResolvedValueOnce(restaurant);
      const removeSpy = jest
        .spyOn(repository, 'remove')
        .mockResolvedValueOnce(undefined);

      await expect(service.remove(id)).resolves.toBeUndefined();
      expect(findOneSpy).toHaveBeenCalledWith(id);
      expect(removeSpy).toHaveBeenCalledWith(restaurant);
    });

    it('should throw NotFoundException when restaurant is not found', async () => {
      const id = '1';
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.remove(id)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a restaurant', async () => {
      const id = '1';
      const updateDto: UpdateRestaurantDto = {
        name: 'Updated Name',
        description: 'Updated Description',
        photoId: 0,
      };
      const restaurant: Restaurant = {
        id: 1,
        name: 'Restaurant Name',
        description: 'Restaurant Description',
        email: '',
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
      const findOneSpy = jest
        .spyOn(service, 'findOne')
        .mockResolvedValueOnce(restaurant);
      const updateSpy = jest
        .spyOn(repository, 'update')
        .mockResolvedValueOnce(undefined);

      await expect(service.update(id, updateDto)).resolves.toBeUndefined();
      expect(findOneSpy).toHaveBeenCalledWith(id);
      expect(updateSpy).toHaveBeenCalledWith(restaurant.id, updateDto);
    });

    it('should throw NotFoundException when restaurant is not found', async () => {
      const id = '1';
      const updateDto: UpdateRestaurantDto = {
        name: 'Updated Name',
        description: 'Updated Description',
        photoId: 0,
      };
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.update(id, updateDto)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('getRestaurantDetails', () => {
    it('should get the details of a restaurant', async () => {
      const id = '1';
      const restaurant: Restaurant = {
        id: 1,
        name: 'Restaurant Name',
        description: 'Restaurant Description',
        photos: [
          {
            id: 1,
            data: expect.any(Readable),
            filename: 'photo.jpg',
            restaurant: null,
            food: null,
            uuid: 'photo-uuid',
          },
          {
            id: 2,
            data: expect.any(Readable),
            filename: 'photo.jpg',
            restaurant: null,
            food: null,
            uuid: 'photo-uuid',
          },
        ],
        locations: [
          {
            id: 1,
            city: 'City 1',
            street: 'Street 1',
            postalCode: '12345',
            restaurant: null,
            delivery: null,
            uuid: 'location-uuid1',
          },
          {
            id: 2,
            city: 'City 2',
            street: 'Street 2',
            postalCode: '67890',
            restaurant: null,
            delivery: null,
            uuid: 'location-uuid2',
          },
        ],
        email: '',
        orders: [],
        deliveries: [],
        events: [],
        menus: [],
        bookings: [],
        reviews: [],
        uuid: '',
        image: undefined,
      };
      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValueOnce(restaurant);

      const result = await service.getRestaurantDetails(id);

      expect(result).toEqual({
        name: restaurant.name,
        description: restaurant.description,
        photos: [
          { id: 1, data: expect.any(Readable) },
          { id: 2, data: expect.any(Readable) },
        ],
        locations: [
          { id: 1, city: 'City 1', street: 'Street 1', postalCode: '12345' },
          { id: 2, city: 'City 2', street: 'Street 2', postalCode: '67890' },
        ],
      });
      expect(findOneSpy).toHaveBeenCalledWith({
        where: { id: parseInt(id) },
        relations: ['photos', 'locations'],
      });
    });

    it('should throw NotFoundException when restaurant is not found', async () => {
      const id = '1';
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.getRestaurantDetails(id)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('findByName', () => {
    it('should find restaurants by name', async () => {
      const name = 'Restaurant';
      const restaurants: Restaurant[] = [
        {
          id: 1,
          name: 'Restaurant Name',
          description: 'Restaurant Description',
          email: '',
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
        {
          id: 2,
          name: 'Restaurant Name2',
          description: 'Restaurant Description2',
          email: '',
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
      const findSpy = jest
        .spyOn(repository, 'find')
        .mockResolvedValueOnce(restaurants);

      const result = await service.findByName(name);

      expect(result).toEqual(restaurants);
      expect(findSpy).toHaveBeenCalledWith({
        where: { name: expect.any(Object) },
      });
    });

    it('should find all restaurants when name is not provided', async () => {
      const restaurants: Restaurant[] = [
        {
          id: 1,
          name: 'Restaurant Name',
          description: 'Restaurant Description',
          email: '',
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
        {
          id: 1,
          name: 'Restaurant Name2',
          description: 'Restaurant Description2',
          email: '',
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
      const findSpy = jest
        .spyOn(repository, 'find')
        .mockResolvedValueOnce(restaurants);

      const result = await service.findByName();

      expect(result).toEqual(restaurants);
      expect(findSpy).toHaveBeenCalledWith(expect.objectContaining({}));
    });
  });

  describe('addPhotoToRestaurant', () => {
    it('should add a photo to a restaurant', async () => {
      const restaurantId = 1;
      const photo: Photo = {
        id: 1,
        data: Buffer.from('photoData'),
        filename: 'photo.jpg',
        restaurant: null,
        food: null,
        uuid: 'photo-uuid',
      };
      const restaurant: Restaurant = {
        id: restaurantId,
        name: 'Restaurant Name',
        description: 'Restaurant Description',
        photos: [],
        email: '',
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
      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValueOnce(restaurant);
      const saveSpy = jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(restaurant);

      const result = await service.addPhotoToRestaurant(restaurantId, photo);

      expect(result).toEqual(restaurant);
      expect(restaurant.photos).toContain(photo);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: { id: restaurantId },
        relations: ['photos'],
      });
      expect(saveSpy).toHaveBeenCalledWith(restaurant);
    });

    it('should throw NotFoundException when restaurant is not found', async () => {
      const restaurantId = 1;
      const photo: Photo = {
        id: 1,
        data: Buffer.from('photoData'),
        filename: 'photo.jpg',
        restaurant: null,
        food: null,
        uuid: 'photo-uuid',
      };
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(
        service.addPhotoToRestaurant(restaurantId, photo),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
