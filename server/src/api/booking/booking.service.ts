import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../restaurant/entities/restaurant-entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking-entity';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(@InjectRepository(Booking) private repo: Repository<Booking>) {}

  create(createBookingDto: CreateBookingDto, res: Restaurant) {
    const booking = this.repo.create(createBookingDto);
    booking.restaurant = res;
    return this.repo.save(booking);
  }

  async update(id: string, dto: UpdateBookingDto) {
    const booking = await this.repo.findOne({ where: { id: parseInt(id) } });
    await this.repo.update(booking.id, dto);
    return await this.repo.findOne({ where: { id: parseInt(id) } });
  }

  async remove(id: string) {
    const booking = await this.repo.findOneBy({ id: parseInt(id) });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return this.repo.remove(booking);
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
    const booking = await this.repo.findOne({
      where: { id: parseInt(id) },
      relations: ['restaurant'], 
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const { numberOfPeople, bookingTime, specialRequest, type} = booking;
    const restaurant = Array.isArray(booking.restaurant) ? booking.restaurant : [booking.restaurant];

    return {
      numberOfPeople,
      bookingTime,
      specialRequest,
      type,
      restaurant: restaurant.map((restaurant) => ({
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        email: restaurant.email,
      })),
    };
  }
}
