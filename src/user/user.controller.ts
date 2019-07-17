import { Controller, Post, HttpCode, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../src/user/entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post('/signUp')
    create(@Body() createUserDto: CreateUserDto) : Promise<User>{
      return this.userService.create(createUserDto);
    }

    @Post('/signIn')
    @HttpCode(200)
    read(@Body() createUserDto: CreateUserDto) : Promise<any>{
      return this.userService.read(createUserDto);
    }
}
