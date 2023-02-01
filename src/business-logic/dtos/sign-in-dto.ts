import { IsEmail, IsAlphanumeric, IsNotEmpty, Matches } from "class-validator";

export class SignInDto {

    @IsEmail(undefined, {message: 'The username provided is not a valid email account!'})
    @IsNotEmpty()
    username: string;

    @IsAlphanumeric()
    @IsNotEmpty()
    password: string;
}