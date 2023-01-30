import { IsEmail } from "class-validator";
import { IsAlphanumeric, IsNotEmpty, Matches } from "class-validator/types/decorator/decorators";

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