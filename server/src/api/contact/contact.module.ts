import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Contact } from './entities/contact-entity';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Contact]),
        TypeOrmModule.forFeature([User]),
    ],
    providers: [
        ContactService,
        UserService,
    ],
    controllers: [ContactController],
    exports: [ContactService],
})
export class ContactModule { }
