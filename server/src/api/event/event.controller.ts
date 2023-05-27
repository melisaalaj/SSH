import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RestaurantService } from '../restaurant/restaurant.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { EventService } from './event.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AuthGuard } from '../auth/auth.guard';
import { UserRoles } from '../user/enums/roles.enum';
import { Roles } from '../../common/decorators/roles.decorato';

@ApiTags('Event')
@Controller('Event')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard, RolesGuard)
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly resturantService: RestaurantService,
  ) {}

  @Roles(UserRoles.ADMIN)
  @Post('/create/:id')
  async createEvent(
    @Param('id') restaurantId: string,
    @Body() createEventDto: CreateEventDto,
  ) {
    const restaurant = await this.resturantService.findOne(restaurantId);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const event = await this.eventService.create(createEventDto, restaurant);

    return event;
  }

  @Roles(UserRoles.ADMIN)
  @Post('/update/:id')
  async update(@Param('id') id: string, @Body() body: UpdateEventDto) {
    return await this.eventService.update(id, body);
  }

  @Roles(UserRoles.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const event = await this.eventService.findOne(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    await this.eventService.remove(id);
  }

  @Roles(UserRoles.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const event = await this.eventService.findOne(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }
}
