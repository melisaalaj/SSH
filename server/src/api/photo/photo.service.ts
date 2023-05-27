import {
  ClassSerializerInterceptor,
  Injectable,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo-entity';
import { Repository } from 'typeorm';
import { retry } from 'rxjs';

@Injectable()
export class PhotoService {
  constructor(@InjectRepository(Photo) private repo: Repository<Photo>) {}

  async uploadPhotos(dataBuffer: Buffer, filename: string) {
    const newPhoto = await this.repo.create({ filename, data: dataBuffer });
    await this.repo.save(newPhoto);
    return newPhoto;
  }

  async getPhotoById(id: string) {
    const photo = await this.findOne(id);
    return photo;
  }

  findOne(id: string) {
    const photo = this.repo.findOneBy({ id: parseInt(id) });
    if (!photo) {
      throw new NotFoundException('Photo not found!');
    }
    return photo;
  }

  async remove(id: string) {
    const photo = await this.findOne(id);
    return this.repo.remove(photo);
  }
}
