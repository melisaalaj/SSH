import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Restaurant } from '../restaurant/entities/restaurant-entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RestaurantService } from '../restaurant/restaurant.service';
import { Event } from '../event/entities/event-entity';
import { EventService } from '../event/event.service';
import { CreateEventDto } from '../event/dtos/create-event.dto';
import { UpdateEventDto } from '../event/dtos/update-event.dto';

describe('EventService', () => {
  let eventService: EventService;
  let eventRepository: Repository<Event>;
  let restaurantService: RestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: getRepositoryToken(Event),
          useClass: Repository,
        },
        {
          provide: RestaurantService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    eventService = module.get<EventService>(EventService);
    eventRepository = module.get<Repository<Event>>(getRepositoryToken(Event));
    restaurantService = module.get<RestaurantService>(RestaurantService);
  });

  describe('create', () => {
    it('should create a new event', async () => {
      // Arrange
      const createEventDto: CreateEventDto = {
        name: '',
        description: '',
        date: undefined
      };
      const restaurant: Restaurant = {
        name: '',
        description: '',
        email: '',
        locations: [],
        orders: [],
        deliveries: [],
        events: [],
        menus: [],
        bookings: [],
        reviews: [],
        id: 0,
        uuid: '',
      };

      const expectedEvent: Event = {
        name: '',
        description: '',
        date: undefined,
        restaurant: new Restaurant,
        id: 0,
        uuid: ''
      };

      jest.spyOn(eventRepository, 'create').mockReturnValue(expectedEvent);
      jest.spyOn(eventRepository, 'save').mockResolvedValue(expectedEvent);

      // Act
      const result = await eventService.create(createEventDto, restaurant);

      // Assert
      expect(eventRepository.create).toHaveBeenCalledWith(createEventDto);
      expect(eventRepository.save).toHaveBeenCalledWith(expectedEvent);
      expect(result).toEqual(expectedEvent);
    });
  });

  describe('update', () => {
    it('should update an existing event', async () => {
      // Arrange
      const eventId = '1';
      const updateEventDto: UpdateEventDto = {
        name: '',
        description: '',
        date: undefined
      };
      const existingEvent: Event = {
        name: '',
        description: '',
        date: undefined,
        restaurant: new Restaurant,
        id: 0,
        uuid: ''
      };

      jest.spyOn(eventRepository, 'findOne').mockResolvedValue(existingEvent);
      jest.spyOn(eventRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(eventRepository, 'findOne').mockResolvedValue(existingEvent);

      // Act
      const result = await eventService.update(eventId, updateEventDto);

      // Assert
      expect(eventRepository.findOne).toHaveBeenCalledWith({ where: { id: parseInt(eventId) } });
      expect(eventRepository.update).toHaveBeenCalledWith(existingEvent.id, updateEventDto);
      expect(eventRepository.findOne).toHaveBeenCalledWith({ where: { id: parseInt(eventId) } });
      expect(result).toEqual(existingEvent);
    });
  });

  describe('remove', () => {
    it('should remove an existing event', async () => {
      // Arrange
      const eventId = '1';
      const existingEvent: Event = {
        name: '',
        description: '',
        date: undefined,
        restaurant: new Restaurant,
        id: 0,
        uuid: ''
      };

      jest.spyOn(eventRepository, 'findOneBy').mockResolvedValue(existingEvent);
      jest.spyOn(eventRepository, 'remove').mockResolvedValue(undefined);

      // Act
      const result = await eventService.remove(eventId);

      // Assert
      expect(eventRepository.findOneBy).toHaveBeenCalledWith({ id: parseInt(eventId) });
      expect(eventRepository.remove).toHaveBeenCalledWith(existingEvent);
      expect(result).toBeUndefined();
    });

    it('should throw NotFoundException if event is not found', async () => {
      // Arrange
      const eventId = '1';

      jest.spyOn(eventRepository, 'findOneBy').mockResolvedValue(undefined);

      // Act and Assert
      await expect(eventService.remove(eventId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('findOne', () => {
    it('should find an existing event', async () => {
      // Arrange
      const eventId = '1';
      const existingEvent: Event = {
        name: '',
        description: '',
        date: undefined,
        restaurant: new Restaurant(),
        id: 0,
        uuid: ''
      };
  
      jest.spyOn(eventRepository, 'findOne').mockResolvedValue(existingEvent);
  
      // Act
      const result = await eventService.findOne(eventId);
  
      // Assert
      expect(eventRepository.findOne).toHaveBeenCalledWith({ where: { id: parseInt(eventId) } });
      expect(result).toEqual(existingEvent);
    });
  
    it('should throw NotFoundException if id is not provided', async () => {
      // Act and Assert
      await expect(eventService.findOne('')).rejects.toThrowError(NotFoundException);
    });    
  });  
});
