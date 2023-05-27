import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location-entity';
import { ILike, Repository } from 'typeorm';
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

  async findByName(city?: string, street?: string) {
    const location = {
      where: {
        ...(city && { city: ILike(`%${city}%`) }),
        ...(street && { street: ILike(`%${street}%`) }),
      },
    };

    return await this.repo.find(location);
  }
}
