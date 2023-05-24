import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery-entity';
import { Repository } from 'typeorm';
import { CreateDeliveryDto } from './dtos/create-delivery.dto';
import { Restaurant } from '../restaurant/entities/restaurant-entity';
import { UpdateDeliveryDto } from './dtos/update-delivery.dto';


@Injectable()
export class DeliveryService {
  constructor(@InjectRepository(Delivery) private repo: Repository<Delivery>) {}


  create(createDeliveryDto: CreateDeliveryDto, res: Restaurant) {
    const delivery = this.repo.create(createDeliveryDto);
    delivery.restaurant = res;
    return this.repo.save(delivery);
  }


  async update(id: string, dto: UpdateDeliveryDto) {
    const delivery = await this.repo.findOne({ where: { id: parseInt(id) } });
    await this.repo.update(delivery.id, dto);
    return await this.repo.findOne({ where: { id: parseInt(id) } });
  }

  async remove(id: string) {
    const delivery = await this.repo.findOneBy({ id: parseInt(id) });
    if (!delivery) {
      throw new NotFoundException('Delivery not found');
    }
    return this.repo.remove(delivery);
  }

  findOne(id: string) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id: parseInt(id) });
  }

  
}
