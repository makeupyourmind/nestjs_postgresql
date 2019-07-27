import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entity/album.entity';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(Album)
        private readonly albumModel: Repository<Album>
    ){}

    async create(album: CreateAlbumDto) : Promise<Album>{
        try {
            return await this.albumModel.save(album)   
        } catch (error) {
            throw new HttpException({
                error: error.message
            }, HttpStatus.BAD_REQUEST);
        }
    }
}
