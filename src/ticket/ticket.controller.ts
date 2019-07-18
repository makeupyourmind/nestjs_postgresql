import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Ticket } from './entity/ticket.entity';
import { FindByParamsValidation } from './requests/FindByParamsValidation';

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService){}
    
    @Get()
    findAll(): Promise<Ticket[]>{
        return this.ticketService.findAll();
    }

    @Post()
    create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket>{
        return this.ticketService.create(createTicketDto);
    }

    @Get(':from/:to')
    findByPeriod(@Param() param: FindByParamsValidation) : Promise<Ticket[]>{
        return this.ticketService.findByPeriod(param.from, param.to)
    }
}
