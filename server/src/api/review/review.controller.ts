import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateReviewDto } from './dtos/create-review.dto';
import { RestaurantService } from '../restaurant/restaurant.service';
import { User } from '../user/entities/user.entity';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { CurrentUser } from '../auth/currentUser';

@Controller('review')
@ApiTags('Review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly restaurantService: RestaurantService,
  ) {}

  @Post('/create/:resId')
  async createReview(
    @Body() dto: CreateReviewDto,
    @CurrentUser() user: User,
    @Param('resId') resId: string,
  ) {
    const restaurant = await this.restaurantService.findOne(resId);
    const review = await this.reviewService.create(dto, user, restaurant);
    return review;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.reviewService.remove(id);
  }

  @Post('/update/:id')
  async update(@Param('id') id: string, @Body() body: UpdateReviewDto) {
    return await this.reviewService.update(id, body);
  }

  @Get('average-rating/:id')
  async getAverageRating(@Param('id') restaurantId: number): Promise<number> {
    return this.reviewService.getAverageRating(restaurantId);
  }
}
