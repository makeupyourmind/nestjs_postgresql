import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entity/offer.entity';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';

@Module({
    imports:[
        TypeOrmModule.forFeature([Offer])
    ],
    controllers: [OfferController],
    providers: [OfferService],
    
})
export class OfferModule {}
