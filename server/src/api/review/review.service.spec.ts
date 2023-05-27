import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ReviewService } from './review.service';
import { Review } from './entities/review-entity';
import { Restaurant } from '../restaurant/entities/restaurant-entity';
import { User } from '../user/entities/user.entity';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { RestaurantService } from '../restaurant/restaurant.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ReviewService', () => {
  let service: ReviewService;
  let repo: Repository<Review>;
  let restaurantService: RestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(Review),
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

    service = module.get<ReviewService>(ReviewService);
    repo = module.get<Repository<Review>>(getRepositoryToken(Review));
    restaurantService = module.get<RestaurantService>(RestaurantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a review', async () => {
      const createReviewDto: CreateReviewDto = {
        rating: '4.5',
        description: 'Great food and service!',
      };
      const user = new User();
      const restaurant = new Restaurant();
      const savedReview = new Review();

      jest.spyOn(repo, 'save').mockResolvedValueOnce(savedReview);

      const result = await service.create(createReviewDto, user, restaurant);

      expect(result).toBe(savedReview);
      expect(repo.save).toHaveBeenCalledWith(expect.any(Review));
    });
  });

  describe('findOne', () => {
    it('should find a review by ID', async () => {
      const id = '1';
      const foundReview = new Review();

      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(foundReview);

      const result = await service.findOne(id);

      expect(result).toBe(foundReview);
      expect(repo.findOne).toHaveBeenCalledWith({
        where: { id: parseInt(id) },
      });
    });

    it('should throw NotFoundException if review is not found', async () => {
      const id = '1';

      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
      expect(repo.findOne).toHaveBeenCalledWith({
        where: { id: parseInt(id) },
      });
    });
  });

  describe('remove', () => {
    it('should remove a review', async () => {
      const id = '1';
      const foundReview = new Review();

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(foundReview);
      jest.spyOn(repo, 'remove').mockResolvedValueOnce(undefined);

      await service.remove(id);

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(repo.remove).toHaveBeenCalledWith(foundReview);
    });
  });

  describe('update', () => {
    it('should update a review', async () => {
      const id = '1';
      const updateReviewDto: UpdateReviewDto = {
        rating: 4.8,
        description: 'Updated review',
      };
      const foundReview = new Review();

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(foundReview);
      jest.spyOn(repo, 'update').mockResolvedValueOnce(undefined);

      await service.update(id, updateReviewDto);

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(repo.update).toHaveBeenCalledWith(foundReview.id, updateReviewDto);
    });
  });

  describe('getAverageRating', () => {
    it('should return the average rating for a restaurant', async () => {
      const restaurantId = 1;
      const restaurant = new Restaurant();
      const reviews = [new Review(), new Review(), new Review()];
      reviews[0].rating = 4;
      reviews[1].rating = 5;
      reviews[2].rating = 3;

      jest
        .spyOn(restaurantService, 'findOne')
        .mockResolvedValueOnce(restaurant);
      jest.spyOn(repo, 'find').mockResolvedValueOnce(reviews);

      const result = await service.getAverageRating(restaurantId);

      expect(result).toBe(4);
      expect(restaurantService.findOne).toHaveBeenCalledWith(
        restaurantId.toString(),
      );
      expect(repo.find).toHaveBeenCalledWith({ where: { restaurant } });
    });

    it('should return 0 if no reviews found for the restaurant', async () => {
      const restaurantId = 1;
      const restaurant = new Restaurant();

      jest
        .spyOn(restaurantService, 'findOne')
        .mockResolvedValueOnce(restaurant);
      jest.spyOn(repo, 'find').mockResolvedValueOnce([]);

      const result = await service.getAverageRating(restaurantId);

      expect(result).toBe(0);
      expect(restaurantService.findOne).toHaveBeenCalledWith(
        restaurantId.toString(),
      );
      expect(repo.find).toHaveBeenCalledWith({ where: { restaurant } });
    });
  });
});
