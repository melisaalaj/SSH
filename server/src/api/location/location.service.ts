import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location-entity';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { Restaurant } from '../restaurant/entities/restaurant-entity';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(@InjectRepository(Location) private repo: Repository<Location>) {}

  create(dto: CreateLocationDto, res: Restaurant) {
    const location = this.repo.create(dto);
    location.restaurant = res;
    return this.repo.save(location);
  }

  async update(id: string, dto: UpdateLocationDto) {
    const location = await this.repo.findOne({ where: { id: parseInt(id) } });
    await this.repo.update(location.id, dto);
    return await this.repo.findOne({ where: { id: parseInt(id) } });
  }

  async remove(id: string) {
    const location = await this.repo.findOneBy({ id: parseInt(id) });
    if (!location) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(location);
  }

  findOne(id: string) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id: parseInt(id) });
  }

  
}
