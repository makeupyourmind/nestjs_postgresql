import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OfferService } from './offer.service';
import { Offer } from './entity/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';

@Controller('offers')
export class OfferController {
    constructor(private readonly offerService: OfferService){}
    
    @Post()
    create(@Body() createOfferDto: CreateOfferDto) : Promise<Offer>{
        return this.offerService.create(createOfferDto);
    }

    @Get()
    findAll(): Promise<Offer[]>{
        return this.offerService.findAll();
    }
    
    @Get(':id')
    findById(@Param('id') id): Promise<Offer>{
        return this.offerService.findById(id);
    }

    @Delete(':id')
    deleteById(@Param('id') id): Promise<Offer>{
        return this.offerService.deleteById(id);
    }

}
