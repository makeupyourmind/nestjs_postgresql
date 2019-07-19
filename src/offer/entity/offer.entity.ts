import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Trade } from '../../trade/entity/trade.entity';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  cryptoCurrency: string;

  @Column()
  city: string;

  @Column({ default: () => false})
  deletedAt: boolean;

  @ManyToOne(type => User, user => user.offers)
  user: User

  @OneToMany(type => Trade, trade => trade.offer) // note: we will create author property in the Photo class below
  trades: Trade[];


}