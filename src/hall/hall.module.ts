import { Module } from '@nestjs/common';
import { Hall } from './entity/hall.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HallController } from './hall.controller';
import { HallService } from './hall.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Hall])
      ],
      controllers: [HallController],
      providers: [HallService]
})
export class HallModule {}
