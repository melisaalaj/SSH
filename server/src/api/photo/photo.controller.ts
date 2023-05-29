import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Readable } from 'stream';
import { Response } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorato';
import { UserRoles } from '../user/enums/roles.enum';

@Controller('photo')
@ApiTags('Photos')
@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard, RolesGuard)
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Roles(UserRoles.ADMIN)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    const newPhoto = await this.photoService.uploadPhotos(
      file.buffer,
      file.originalname,
    );
    return newPhoto;
  }

  @Roles(UserRoles.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const restaurant = await this.photoService.findOne(id);
    if (!restaurant) {
      throw new NotFoundException('Photo not found');
    }
    await this.photoService.remove(id);
  }

  @Get(':id')
  async findOne(@Res() response: Response, @Param('id') id: string) {
    const photo = await this.photoService.getPhotoById(id);

    const stream = Readable.from(photo.data);
    stream.pipe(response);
  }
}
