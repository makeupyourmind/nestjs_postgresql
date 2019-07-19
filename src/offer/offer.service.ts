import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entity/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class OfferService {
    constructor(
        @InjectRepository(Offer)
        private readonly offerModel: Repository<Offer>
    ){}
    
    async create(offer: CreateOfferDto): Promise<Offer>{
        try {
            return await this.offerModel.save(offer)   
        } catch (error) {
            throw new HttpException({
                error: error.message
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(): Promise<Offer[]>{
        return await this.offerModel.find({
            relations: ['user'],
            where: {deletedAt: false}
        });
    }

    async findById(id: number): Promise<Offer>{
        return await this.offerModel.findOne({
            where : { id : id, deletedAt: false}, 
            relations: ['user']
        });
    }

    async deleteById(id : number): Promise<any>{
        try {
            // const toDelete = await this.offerModel.findOne({id});
            // if (!toDelete) {
            //     throw new NotFoundException();
            // }
            // await this.offerModel.delete(id);
            // return toDelete
            await this.offerModel.update(
                { id: id },
                { deletedAt: true },
              );
            return await this.offerModel.findOne(id);
        } catch (error) {
            throw new HttpException({
                error: error.message
            }, HttpStatus.BAD_REQUEST)
        }
    }
}
