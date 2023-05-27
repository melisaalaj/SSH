import { Food } from 'src/api/food/entities/food-entity';
import { Restaurant } from 'src/api/restaurant/entities/restaurant-entity';
import { BaseEntity } from 'src/common/db/customBaseEntites/BaseEntity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Menu extends BaseEntity {

@Column({ nullable: true })
name: string;


 @ManyToOne(() => Restaurant, (restaurant) => restaurant.menus)
 restaurant: Restaurant;

 @OneToMany(() => Food, (food) => food.menu, { cascade: true })
 foods: Food[];

 
}
