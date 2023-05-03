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
    const report = this.repo.create(dto);
    report.restaurant = res;
    return this.repo.save(report);
  }

  async update(id: string, dto: UpdateLocationDto) {
    const location = await this.findOne(id);
    await this.repo.update(location.id, dto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const location = await this.findOne(id);
  
    return this.repo.remove(location);
  }

  async findOne(id: string) {
    const location = await this.repo.findOneBy({ id: parseInt(id) });
    if (!location) {
      throw new NotFoundException();
    }
    return location;
  }

  
}
