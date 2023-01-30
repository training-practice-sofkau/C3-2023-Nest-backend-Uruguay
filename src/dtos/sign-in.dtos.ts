import { IsEmail } from "class-validator";
import { IsNotEmpty, IsString, Min } from "class-validator/types/decorator/decorators";

export class SignInDto {

    @IsEmail(undefined, { message: 'the data provider is not a valid email.' })
    @IsString()
    username: string;

    @IsNotEmpty({ message: 'the password is required.' })
    @IsString()
    @Min(5)
    password: string;
}