import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@Controller('photo')
@ApiTags('Photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    const newPhoto = await this.photoService.uploadPhotos(
      file.buffer,
      file.originalname,
    );
    return newPhoto;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const restaurant = await this.photoService.findOne(id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }
    await this.photoService.remove(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const photo = await this.photoService.findOne(id);
    if (!photo) {
      throw new NotFoundException('Restaurant not found');
    }
    return photo;
  }
}
