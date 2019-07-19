import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trade } from './entity/trade.entity';
import { Repository } from 'typeorm';
import { CreateTradeDto } from './dto/create-trade.dto';

@Injectable()
export class TradeService {
    constructor(
        @InjectRepository(Trade)
        private readonly tradeModel: Repository<Trade>
    ){}

    async create(trade: CreateTradeDto): Promise<Trade>{
        try {
            return await this.tradeModel.save(trade);   
        } catch (error) {
            throw new HttpException({
                error: error.message
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(): Promise<Trade[]>{
        try {
            return await this.tradeModel.find({
                relations: ['offer']
            })
        } catch (error) {
            throw new HttpException({
                error: error.message
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async findById(id : number) : Promise<Trade>{
        try {
            return await this.tradeModel.findOne({
                where : { id : id}, 
                relations: ['offer']
            });
        } catch (error) {
            throw new HttpException({
                error: error.message
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteById(id : number): Promise<Trade>{
        try {
            const toDelete = await this.tradeModel.findOne({id});
            if (!toDelete) {
                throw new NotFoundException();
            }
            await this.tradeModel.delete(id);
            return toDelete
        } catch (error) {
            throw new HttpException({
                error: error.message
            }, HttpStatus.BAD_REQUEST);
        }
    }
}
