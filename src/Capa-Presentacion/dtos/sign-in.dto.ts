import { IsEmail } from 'class-validator';
import { IsAlphanumeric, IsNotEmpty, IsString, Min } from "class-validator/types/decorator/decorators";

export class SignInDto {

    @IsEmail(undefined, { message: 'the data provider is not a valid email.' })
    @IsString()
    email: string;


    @IsAlphanumeric()
    @IsNotEmpty({ message: 'the password is required.' })
    @IsString()
    @Min(5,{message: "El minimo es de 5 we"} )
    password: string;
}