import { IsEmail, IsNotEmpty, Min, Max, Length } from 'class-validator';

export class CreateUserDto {
    id: number;

    //@Length(4)
    password: string;
   
    //@IsEmail()
    email: string;

    role: string;
}