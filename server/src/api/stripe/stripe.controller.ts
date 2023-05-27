import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { AddCreditCardDto } from './dto/create-CreditCard.dto';
import { UserService } from '../user/user.service';
import { FoodService } from '../food/food.service';
import { CreateFoodDto } from '../food/dto/create-food';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/currentUser';
import { User } from '../user/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('stripe')
@ApiBearerAuth()
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly userService: UserService,
    private readonly foodService: FoodService,
  ) {}

  @Post('charge')
  async charge(@Body() body: AddCreditCardDto) {
    return await this.stripeService.charge(body);
  }

  @Post('createProduct')
  async createProduct(@Body() body: CreateFoodDto): Promise<any> {
    const { product, price } = await this.stripeService.createProduct(
      body.name,
      body.price,
    );

    return { product, price };
  }

  @UseGuards(AuthGuard)
  @Post('chargeByProduct/:productId')
  async chargeByProduct(
    @Body() card: AddCreditCardDto,
    @Param('productId') productId: string,
    @CurrentUser() user: User,
  ) {
    console.log(user);
    const currentUser = await this.userService.findByEmail(user.email);
    const product = await this.foodService.findOne(productId);

    return await this.stripeService.chargeByProduct(
      card,
      product.productId,
      product.price,
      currentUser.stripeCustomerId,
    );
  }
}
