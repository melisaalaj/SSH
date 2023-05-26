import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateEventDto } from "./dtos/create-event.dto";
import { Restaurant } from "../restaurant/entities/restaurant-entity";
import { UpdateEventDto } from "./dtos/update-event.dto";
import { Event } from "./entities/event-entity";



@Injectable()
export class EventService {
  constructor(@InjectRepository(Event) private repo: Repository<Event>) {}


  create(createEventDto: CreateEventDto, res: Restaurant) {
    const event = this.repo.create(createEventDto);
    event.restaurant = res;
    return this.repo.save(event);
  }


  async update(id: string, dto: UpdateEventDto) {
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
