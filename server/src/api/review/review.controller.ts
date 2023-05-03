import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateReviewDto } from './dtos/create-review.dto';
import { RestaurantService } from '../restaurant/restaurant.service';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { User } from '../user/entities/user.entity';
import { UpdateReviewDto } from './dtos/update-review.dto';

@Controller('review')
@ApiTags('Review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly restaurantService: RestaurantService,
  ) {}

  // Todo fix GetCurrentUser()
  @Post('/create/:resId')
  async createReview(
    @Body() dto: CreateReviewDto,
    @GetCurrentUser() user: User,
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
}
