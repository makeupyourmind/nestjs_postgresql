import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Ticket } from './entity/ticket.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(Ticket) 
        private readonly ticketModel: Repository<Ticket>
    ){}
    
    async create(ticket: CreateTicketDto) : Promise<Ticket>{
        try {
            return await this.ticketModel.save(ticket);
        } catch (error) {
            throw new HttpException({
                error: error.message
            }, HttpStatus.BAD_REQUEST)
        }
    }

    async findAll() : Promise<Ticket[]>{
        return await this.ticketModel.find({
            relations: ['user', 'hall']
        });
    }
    
    async findById(id: number) : Promise <Ticket>{
        return await this.ticketModel.findOne({
            where : { id : id}, 
            relations: ['user', 'hall']
        });
    }

    async update(id, ticket): Promise<Ticket>{
        const toUpdate = await this.ticketModel.findOne({id})
        if (!toUpdate) {
            throw new NotFoundException();
        }
        await this.ticketModel.update(id, ticket);
        return await this.ticketModel.findOne({id});
    }

    async findByPeriod(from: string, to: string): Promise<Ticket[]>{
        return await this.ticketModel.find({
            from: from,
            to: to
        })
    }

    async deleteById(id: number): Promise<Ticket>{
        const toDelete = await this.ticketModel.findOne({id});
        if (!toDelete) {
            throw new NotFoundException();
        }
        await this.ticketModel.delete(id);
        return toDelete
    }

    async delete(){
        return await this.ticketModel.delete({})
    }
}
