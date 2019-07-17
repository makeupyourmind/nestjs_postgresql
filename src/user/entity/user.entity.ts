import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

}