import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review-entity';
import { Repository } from 'typeorm';
import { Restaurant } from '../restaurant/entities/restaurant-entity';
import { User } from '../user/entities/user.entity';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(Review) private repo: Repository<Review>) {}

  create(dto: CreateReviewDto, user: User, res: Restaurant) {
    const report = this.repo.create(dto);
    report.user = user;
    report.restaurant = res;
    return this.repo.save(report);
  }

  async findOne(id: string) {
    const review = await this.repo.findOneBy({ id: parseInt(id) });
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
    return await this.repo.update(review.id, dto);
  }
}
