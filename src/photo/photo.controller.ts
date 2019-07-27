import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Photo } from './entity/photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Controller('photos')
export class PhotoController {
    constructor(private readonly photoService: PhotoService){}

    @Post()
    create(@Body() createPhotoDto: Photo): Promise<Photo>{
        return this.photoService.create(createPhotoDto)
    }

    @Get(':id')
    findOne(@Param('id') id : number): Promise<Photo>{
        return this.photoService.findOne(id);
    }

    @Get()
    findAll(): Promise<Photo[]>{
        return this.photoService.findAll();
    }
}
