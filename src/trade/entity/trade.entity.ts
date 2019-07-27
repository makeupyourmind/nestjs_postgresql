import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { User } from '../../user/entity/user.entity';
// import { Offer } from '/src/offer/entity/offer.entity';
import {Offer} from '../../offer/entity/offer.entity';

@Entity()
export class Trade {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  seller: string;

  @Column()
  buyer: string;

  @ManyToOne(type => Offer, offer => offer.trades)
  offer: Offer[];

}