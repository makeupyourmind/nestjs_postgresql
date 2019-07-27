import { Controller, Post, Body } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from './entity/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('albums')
export class AlbumController {
    constructor(private readonly albumService: AlbumService){}

    @Post()
    create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album>{
        return this.albumService.create(createAlbumDto);
    }
}
