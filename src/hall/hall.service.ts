import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { Hall } from './entity/hall.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHallDto } from './dto/create-hall.dto';

@Injectable()
export class HallService {
    constructor(
        @InjectRepository(Hall) 
        private readonly hallModel: Repository<Hall>
    ){}

    async create(hall: CreateHallDto): Promise<Hall>{
        try {
            return await this.hallModel.save(hall)
        } catch (error) {
            throw new HttpException({
                error: error.message
            }, HttpStatus.BAD_REQUEST)
        }
    }

    async findAll(): Promise <Hall[]>{
        return await this.hallModel.find()
    }
    
    async findById(id: number): Promise<Hall>{
        return await this.hallModel.findOne(id)
    }

    async update(id: number, hall: CreateHallDto): Promise<Hall>{
        const toUpdate = await this.hallModel.findOne({id})
        if (!toUpdate) {
            throw new NotFoundException();
        }
        await this.hallModel.update(id, hall);
        return await this.hallModel.findOne({id});
    }

    async deleteById(id: number): Promise<Hall>{
        const toDelete = await this.hallModel.findOne({id});
        if (!toDelete) {
            throw new NotFoundException();
        }
        await this.hallModel.delete(id);
        return toDelete
    }

    async deleteAll(){
        return await this.hallModel.delete({})
    }
}
