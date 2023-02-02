import { IsEmail, IsNotEmpty, IsString, Min } from "class-validator";


export class SignInDto {

    @IsEmail(undefined, { message: 'the data provider is not a valid email.' })
    @IsString({ message: 'the data provider is not a valid String.' })
    username: string;

    @IsNotEmpty({ message: 'the password is required.' })
    @IsString({ message: 'the data provider is not a valid string.' })
    @Min(5,{ message: 'la contrasenia tiene que suerar los 5 caracteres' })
    password: string;
}