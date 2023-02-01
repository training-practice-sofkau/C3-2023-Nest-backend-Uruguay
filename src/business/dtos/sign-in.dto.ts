import { IsEmail, IsString, IsNotEmpty, Min } from "class-validator";


export class SignInDto {

    @IsEmail(undefined, { message: 'the data provider is not a valid email.' })
    @IsString()
    username: string;

    @IsNotEmpty({ message: 'the password is required.' })
    @IsString()
    @Min(5)
    password: string;
}