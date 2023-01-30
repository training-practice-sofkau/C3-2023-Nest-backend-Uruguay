import { IsEmail, IsNotEmpty, IsString, Min } from "class-validator";

export class SignInDto {

    @IsEmail(undefined, { message: 'the data provider is not a valid email.' })
    @IsString()
    email: string;

    @IsNotEmpty({ message: 'the password is required.' })
    @IsString()
    @Min(5)
    password: string;
}