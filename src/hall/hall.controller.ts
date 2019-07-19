import { Controller, Post, Body, Get, UseGuards, Delete, Param, Put } from '@nestjs/common';
import { HallService } from './hall.service';
import { CreateHallDto } from './dto/create-hall.dto';
import { Hall } from './entity/hall.entity';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '../user/roles/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { UpdateResult } from 'typeorm';

@Controller('halls')
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

    @Get(':id')
    findById(@Param('id') id) : Promise<Hall> {
      return this.hallService.findById(id);
    }

    @Put(':id')
    update(@Body() updateHallDto: CreateHallDto, @Param('id') id: number): Promise<Hall>{
      return this.hallService.update(id, updateHallDto);
    }

    @Delete(':id')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    delete(@Param('id') id: number): Promise<Hall>{
      return this.hallService.deleteById(id);
    }

    @Delete()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    deleteAll(){
      return this.hallService.deleteAll();
    }
    
}
