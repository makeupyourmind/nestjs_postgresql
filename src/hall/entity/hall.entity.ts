import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ticket } from '../../ticket/entity/ticket.entity';

@Entity()
export class Hall {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256, nullable: false })
  title: string;

  @Column()
  description: string;

  @Column({ length: 100, default: "" })
  imageURL: string;

  @OneToMany(type => Ticket, ticket => ticket.hall)
  tickets: Ticket[];
  
}