import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Ticket } from './entity/ticket.entity';
import { FindByParamsValidation } from './requests/FindByParamsValidation';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '../user/roles/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../shared/guards/roles.guard';

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService){}
    
    @Post()
    create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket>{
        return this.ticketService.create(createTicketDto);
    }

    @Get()
    findAll(): Promise<Ticket[]>{
        return this.ticketService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id): Promise<Ticket>{
        return this.ticketService.findById(id);
    }

    @Get(':from/:to')
    findByPeriod(@Param() param: FindByParamsValidation) : Promise<Ticket[]>{
        return this.ticketService.findByPeriod(param.from, param.to)
    }

    @Put(':id')
    update(@Body() updateTicketDto: CreateTicketDto, @Param('id') id: number): Promise<Ticket>{
      return this.ticketService.update(id, updateTicketDto);
    }

    @Delete(':id')
    deleteById(@Param('id') id: number): Promise<Ticket>{
        //return 'you can do it';
        return this.ticketService.deleteById(id);
    }

    @Delete()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    delete(){
        return this.ticketService.delete()
    }

}
