import { IsEmail, IsNotEmpty, Min, Max, Length } from 'class-validator';

export class CreateUserDto {
    readonly id: number;

    @Length(4)
    readonly password: string;
   
    @IsEmail()
    readonly email: string;

    readonly role: string;
}