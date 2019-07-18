import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Hall } from '../../hall/entity/hall.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Hall, hall => hall.tickets)
  hall: Hall[];
  
  @ManyToOne(type => User, user => user.tickets)
  user: User[];

  @Column()
  from: Date;

  @Column()
  to: Date;

  @Column({ length: 100, default: "" })
  title: string;
  
}