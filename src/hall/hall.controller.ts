import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { HallService } from './hall.service';
import { create } from 'domain';
import { CreateHallDto } from './dto/create-hall.dto';
import { Hall } from './entity/hall.entity';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '../user/roles/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../shared/guards/roles.guard';

@Controller('hall')
export class HallController {
    constructor(private readonly hallService : HallService){}

    @Post()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    create(@Body() createHallDto : CreateHallDto) : Promise<Hall> {
      return this.hallService.create(createHallDto);
    }

    @Get()
    findAll() : Promise<Hall[]> {
      return this.hallService.findAll();
    }
}
