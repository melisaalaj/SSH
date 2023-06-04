import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.fto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Roles } from '../../common/decorators/roles.decorato';
import { UserRoles } from '../user/enums/roles.enum';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('/create')
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Post('/update/:id')
  async update(@Param('id') id: string, @Body() body: UpdateContactDto) {
    return await this.contactService.update(id, body);
  }

  @Roles(UserRoles.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const contact = await this.contactService.findOne(id);
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    await this.contactService.remove(id);
  }

  @Roles(UserRoles.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const contact = await this.contactService.findOne(id);
    if (!contact) {
      throw new NotFoundException('Order not found');
    }
    return contact;
  }

  @Roles(UserRoles.ADMIN)
  @Get()
  async findAll() {
    return await this.contactService.findAll();
  }
}
