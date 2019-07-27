import { Album } from '../../album/entity/album.entity';
import { ManyToMany, PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';

@Entity()
export class Photo {
    /// ... other columns

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    filename: string;

    @ManyToMany(type => Album, album => album.photos)
    albums: Album[];
}