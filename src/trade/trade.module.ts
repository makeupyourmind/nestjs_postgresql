import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trade } from './entity/trade.entity';
import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Trade])
    ],
    controllers: [TradeController],
    providers: [TradeService],
})
export class TradeModule {}
