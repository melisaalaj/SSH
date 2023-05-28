import { Food } from '../../../api/food/entities/food-entity';
import { Restaurant } from '../../../api/restaurant/entities/restaurant-entity';
import { BaseEntity } from '../../../common/db/customBaseEntites/BaseEntity';
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
