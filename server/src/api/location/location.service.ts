import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location-entity';
import { ILike, Repository, getRepository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { Restaurant } from '../restaurant/entities/restaurant-entity';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(@InjectRepository(Location) private repo: Repository<Location>) {}

  create(dto: CreateLocationDto) {
    const location = this.repo.create(dto);
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
    const location = await this.repo.findOne({ where: { id: parseInt(id) } });
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

  async getRestaurantsByCity(city: string): Promise<Restaurant[]> {
    const locations = await this.repo.find({
      where: { city: ILike(`%${city}%`) },
      relations: ['restaurant'],
    });
  
    if (locations.length === 0) {
      throw new NotFoundException('No data found for the specified city.');
    }
  
    const restaurants = locations.map((location) => location.restaurant);
    return restaurants.filter((restaurant) => restaurant !== null);
  }

}
