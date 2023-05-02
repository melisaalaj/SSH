import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo-entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhotoService {
  constructor(@InjectRepository(Photo) private repo: Repository<Photo>) {}

  async uploadPhotos(dataBuffer: Buffer, filename: string) {
    const newPhoto = await this.repo.create({ filename, data: dataBuffer });
    await this.repo.save(newPhoto);
    return newPhoto;
  }

  async getPhotoById(id: string) {
    const photo = await this.repo.findOne({ where: { id: parseInt(id) } });
    if (!photo) {
      throw new NotFoundException('Photo not found!');
    }
    return photo;
  }

  findOne(id: string) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id: parseInt(id) });
  }

  async remove(id: string) {
    const photo = await this.repo.findOneBy({ id: parseInt(id) });
    if (!photo) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(photo);
  }
}
