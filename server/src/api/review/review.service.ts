import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review-entity';
import { Repository } from 'typeorm';
import { Restaurant } from '../restaurant/entities/restaurant-entity';
import { User } from '../user/entities/user.entity';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { RestaurantService } from '../restaurant/restaurant.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private repo: Repository<Review>,
    private restaurantService: RestaurantService,
  ) {}

  create(dto: CreateReviewDto, user: User, res: Restaurant) {
    const review = new Review();
    review.rating = parseFloat(dto.rating);
    review.description = dto.description;
    review.user = user;
    review.restaurant = res;
    return this.repo.save(review);
  }

  async findOne(id: string) {
    const review = await this.repo.findOne({ where: { id: parseInt(id) } });
    if (!review) {
      throw new NotFoundException();
    }
    return review;
  }

  async remove(id: string) {
    const review = await this.findOne(id);
    return this.repo.remove(review);
  }

  async update(id: string, dto: UpdateReviewDto) {
    const review = await this.findOne(id);
    return this.repo.update(review.id, dto);
  }

  // async getAverageRating(restaurantId: number): Promise<number> {
  //   const restaurant = await this.restaurantService.findOne(restaurantId.toString());
  //   const reviews = await this.repo.find({ where: { restaurant } });
  
  //   if (reviews.length === 0) {
  //     return 0; 
  //   }
  
  //   const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  //   const averageRating = totalRating / reviews.length;
  //   return parseFloat(averageRating.toFixed(2));
  // }
}
