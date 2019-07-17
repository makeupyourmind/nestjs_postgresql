import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    private saltRounds = 10;

    constructor(@InjectRepository(User) 
    private readonly userModel: Repository<User>,
    private readonly jwtService: JwtService
  ) {}
    
    async create(user: User): Promise<User>{
      try {
        user.password = await this.getHash(user.password);
        return await this.userModel.save(user)
      } catch (error) {
          throw new HttpException({
            error: error.message,
          }, HttpStatus.BAD_REQUEST)
      }
    }

    async read(user: User): Promise <any>{
        try {
            let response = await this.userModel.findOne({email: user.email})
            if(response !== null && await this.compareHash(user.password,response.password)){
                const accessToken = this.jwtService.sign(JSON.parse(JSON.stringify(response)));
                return {
                    expiresIn: 3600,
                    accessToken,
                    user_id: response.id,
                    status: HttpStatus.OK
                }; 
            }
            else{
                throw new HttpException({
                    error: 'Unauthorized cause wrong password or email',
                }, HttpStatus.BAD_REQUEST);
            }
        } catch (error) {
            throw new HttpException({
                error: error.message
            }, HttpStatus.BAD_REQUEST)
        }
    }

    async getHash(password: string | undefined): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }
      
    async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
  
    async validateUser(payload: User): Promise<any> {
        return await this.userModel.findOne(payload.id);
    }

    async findById(id: number): Promise<User>{
        try {
            return await this.userModel.findOne(id)
        } catch (error) {
            throw new HttpException({
                error: error.message
            }, HttpStatus.BAD_REQUEST)
        }
    }
}
