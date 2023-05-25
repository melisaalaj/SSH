import { Restaurant } from "src/api/restaurant/entities/restaurant-entity";
import { Location } from "src/api/location/entities/location-entity";
import { BaseEntity } from "src/common/db/customBaseEntites/BaseEntity";
import { Column, Entity, ManyToOne, OneToOne } from "typeorm";

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