import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/orders-entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Restaurant } from '../restaurant/entities/restaurant-entity';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

  create(createOrderDto: CreateOrderDto, res: Restaurant) {
    const order = this.repo.create(createOrderDto);
    order.restaurant = res;
    return this.repo.save(order);
  }

  async update(id: string, dto: UpdateOrderDto) {
    const order = await this.repo.findOne({ where: { id: parseInt(id) } });
    await this.repo.update(order.id, dto);
    return await this.repo.findOne({ where: { id: parseInt(id) } });
  }

  async remove(id: string) {
    const order = await this.repo.findOneBy({ id: parseInt(id) });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return this.repo.remove(order);
  }

  findOne(id: string) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id: parseInt(id) });
  }

  async findAll() {
    return await this.repo.findAndCount();
  }

  async getOrderDetails(id: string) {
    const order = await this.repo.findOne({
      where: { id: parseInt(id) },
      relations: ['restaurant', 'foods'], //payments
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const { arrivalTime, price, orderConfimation } = order;
    const foods = Array.isArray(order.foods) ? order.foods : [order.foods];

    return {
      arrivalTime,
      price,
      orderConfimation,
      foods: foods.map((food) => ({
        id: food.id,
        name: food.name,
        price: food.price,
      })),
    };
  }
}
