import { Injectable } from '@nestjs/common';
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

    async findAll() : Promise<Ticket[]>{
        return await this.ticketModel.find();
    }

    async create(ticket: CreateTicketDto) : Promise<Ticket>{
        return await this.ticketModel.save(ticket);
    }

    async findByPeriod(from: string, to: string): Promise<Ticket[]>{
        return await this.ticketModel.find({
            from: from,
            to: to
        })
    }
}
