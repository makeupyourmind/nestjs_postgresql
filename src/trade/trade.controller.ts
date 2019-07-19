import { Controller, Body, Param, Get, Post, Delete } from '@nestjs/common';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { Trade } from './entity/trade.entity';

@Controller('trades')
export class TradeController {
    constructor(private readonly tradeService : TradeService){}

    @Post()
    create(@Body() createTradeDto: CreateTradeDto): Promise<Trade>{
        return this.tradeService.create(createTradeDto);
    }

    @Get()
    findAll(): Promise<Trade[]>{
        return this.tradeService.findAll()
    }

    @Get(':id')
    findById(@Param('id') id) : Promise<Trade>{
        return this.tradeService.findById(id);
    }

    @Delete(':id')
    deleteById(@Param('id') id) : Promise<Trade>{
        return this.tradeService.deleteById(id);
    }

}
