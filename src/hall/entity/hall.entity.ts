import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

}