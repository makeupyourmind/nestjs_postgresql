import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entity/photo.entity';
import { Repository, Like, In } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Album } from '../album/entity/album.entity';

@Injectable()
export class PhotoService {
    constructor(
        @InjectRepository(Photo)
        private readonly photoModel: Repository<Photo>,
        @InjectRepository(Album)
        private readonly albumModel: Repository<Album>
    ){}

    async create(photo: Photo): Promise<Photo>{
        try {

            let a : any = photo.albums;
            photo.albums = a.split(',');

            const albums : any = await this.albumModel.find({
                where: {
                    id: In( photo.albums )
                }
            });

            return await this.photoModel.save({
                name: photo.name,
                description: photo.description,
                filename: photo.filename,
                albums: albums.map(item => item)
            })

        } catch (error) {
            throw new HttpException({
                error: error.message
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async findOne(id : number): Promise<any>{
        return await this.photoModel.findOne({
            where : { id : id},
            relations: ['albums']
        })
    }

    async findAll(): Promise<Photo[]>{
        try {
            return await this.photoModel.find({})
        } catch (error) {
            throw new HttpException({
                error: error.message
            }, HttpStatus.BAD_REQUEST);
        }
    }
}
