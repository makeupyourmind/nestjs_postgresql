import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ticket } from '../../ticket/entity/ticket.entity';
import { Offer } from '../../offer/entity/offer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  password: string;

  @Column()
  email: string;

  @Column({ length: 100, default: "User" })
  role: string;

  @OneToMany(type => Ticket, ticket => ticket.user)
  tickets: Ticket[];

  @OneToMany(type => Offer, offer => offer.user)
  offers: Offer[]

}