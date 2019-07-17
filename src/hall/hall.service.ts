import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Hall } from './entity/hall.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HallService {
    constructor(
        @InjectRepository(Hall) 
        private readonly hallModel: Repository<Hall>
    ){}

    async create(hall: Hall): Promise<Hall>{
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
}
