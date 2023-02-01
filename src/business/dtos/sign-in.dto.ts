import { IsEmail, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class SignInDto {

    @IsUUID(4, { message: "this must to be uuid v4" })
    @IsNotEmpty()
    id: string;

    @IsEmail(undefined, { message: 'the data provider is not a valid email.' })
    @IsString()
    username: string;

    @IsNotEmpty({ message: 'the password is required.' })
    @IsString()
    @Length(5, 30)
    password: string;
}