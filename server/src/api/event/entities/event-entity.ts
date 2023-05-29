import { Restaurant } from "../../../api/restaurant/entities/restaurant-entity";
import { BaseEntity } from "../../../common/db/customBaseEntites/BaseEntity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity()
export class Event extends BaseEntity {
    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    description: string

    @Column({nullable: true})
    date: Date;

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.events)
    restaurant: Restaurant; 
}