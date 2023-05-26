import { User } from 'src/api/user/entities/user.entity';
import { BaseEntity } from 'src/common/db/customBaseEntites/BaseEntity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity({ name: 'contact' })
export class Contact extends BaseEntity {

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    @Column()
    email: string;
    
    @Column()
    message: string;

    @ManyToOne(() => User, (user) => user.contacts)
    user: User;
}

