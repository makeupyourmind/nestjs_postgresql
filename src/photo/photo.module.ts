import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entity/photo.entity';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { Album } from '../album/entity/album.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Photo]),
    TypeOrmModule.forFeature([Album])
  ],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [PhotoService],
})
export class PhotoModule {}
