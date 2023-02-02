import { IsEmail, IsString, IsNotEmpty, Min } from 'class-validator';
export class SignInDTO {

    @IsEmail(undefined, { message: 'the data provider is not a valid email.' })
    @IsString()
    username: string;

    @IsNotEmpty({ message: 'the password is required.' })
    @IsString()
    password: string;
}