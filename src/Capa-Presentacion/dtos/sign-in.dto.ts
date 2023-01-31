import { IsEmail, IsString, IsAlphanumeric, IsNotEmpty, Min } from "class-validator";



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