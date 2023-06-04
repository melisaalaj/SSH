import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { RestaurantService } from '../restaurant/restaurant.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { User } from '../user/entities/user.entity';
import { UserRoles } from '../user/enums/roles.enum';
import { UserGender } from '../user/enums/userGender.enum';
import { Order } from '../order/entities/orders-entity';
import { Booking } from '../booking/entities/booking-entity';
import { Restaurant } from '../restaurant/entities/restaurant-entity';
import { Repository, UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from './entities/review-entity';
import { LocationService } from '../location/location.service';
import { Location } from '../location/entities/location-entity';

describe('ReviewController', () => {
  let controller: ReviewController;
  let reviewService: ReviewService;
  let restaurantService: RestaurantService;
  let reviewRepository: Repository<Review>; // Modify the variable name to reviewRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        ReviewService,
        RestaurantService,
        LocationService,
        {
          provide: getRepositoryToken(Review),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Restaurant),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Location),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ReviewController>(ReviewController);
    reviewService = module.get<ReviewService>(ReviewService);
    restaurantService = module.get<RestaurantService>(RestaurantService);
    reviewRepository = module.get<Repository<Review>>(
      getRepositoryToken(Review),
    );
  });

  describe('createReview', () => {
    it('should create a new review', async () => {
      const dto: CreateReviewDto = {
        rating: '',
        description: '',
      };

      const user: User = {
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

      const resId = '1';

      const restaurant = {
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

      const createdReview = {
        id: 1,
        uuid: '',
        rating: 0,
        description: '',
        user: {
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
        restaurant: {
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
        },
      };

      jest
        .spyOn(restaurantService, 'findOne')
        .mockResolvedValueOnce(restaurant);
      jest.spyOn(reviewService, 'create').mockResolvedValueOnce(createdReview);

      const result = await controller.createReview(dto, user, resId);

      expect(result).toBe(createdReview);
      expect(restaurantService.findOne).toHaveBeenCalledWith(resId);
      expect(reviewService.create).toHaveBeenCalledWith(dto, user, restaurant);
    });
  });

  describe('remove', () => {
    it('should remove a review', async () => {
      const id = '1';

      jest.spyOn(reviewService, 'remove').mockResolvedValueOnce(undefined);

      await expect(controller.remove(id)).resolves.toBeUndefined();
      expect(reviewService.remove).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a review', async () => {
      const id = '1';
      const body: UpdateReviewDto = {
        rating: 0,
        description: '',
      };

      const updatedReview: UpdateResult = {
        raw: {},
        affected: 1,
        generatedMaps: [],
      };

      jest.spyOn(reviewService, 'update').mockResolvedValueOnce(updatedReview);

      const result = await controller.update(id, body);

      expect(result).toBe(updatedReview);
      expect(reviewService.update).toHaveBeenCalledWith(id, body);
    });
  });

  describe('getAverageRating', () => {
    it('should get the average rating for a restaurant', async () => {
      const restaurantId = 1;
      const averageRating = 4.5;

      jest
        .spyOn(reviewService, 'getAverageRating')
        .mockResolvedValueOnce(averageRating);

      const result = await controller.getAverageRating(restaurantId);

      expect(result).toBe(averageRating);
      expect(reviewService.getAverageRating).toHaveBeenCalledWith(restaurantId);
    });
  });
});
