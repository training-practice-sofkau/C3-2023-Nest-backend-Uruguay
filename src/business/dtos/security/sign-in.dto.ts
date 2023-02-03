import { IsEmail, IsAlphanumeric, IsNotEmpty } from "class-validator";

export class SignInDto {

    @IsEmail(undefined, {message: 'The username provided is not a valid email account!'})
    @IsNotEmpty()
    username: string;

    //TODO: check how to accept special symbols
    @IsAlphanumeric()
    @IsNotEmpty()
    //@Matches()
    password: string;
}