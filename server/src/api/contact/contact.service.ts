import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact-entity';
import { CreateContactDto } from './dto/create-contact.fto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(@InjectRepository(Contact) private repo: Repository<Contact>) {}

  create(createContactDto: CreateContactDto) {
    const contact = this.repo.create(createContactDto);  
    return this.repo.save(contact);
  }

  async update(id: string, updateContactDto: UpdateContactDto): Promise<Contact> {
    const contact = await this.repo.findOne({ where: { id: parseInt(id) } });
    await this.repo.update(contact.id, updateContactDto);
    return await this.repo.findOne({ where: { id: parseInt(id) } })
  }

  async remove(id: string){
    const contact = await this.repo.findOneBy({ id: parseInt(id) });
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    return this.repo.remove(contact);
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

}

