import { IsEmail } from "class-validator";
import { IsNotEmpty, IsString, Min } from "class-validator/types/decorator/decorators";

export class SignInDto {

    @IsEmail(undefined, { message: 'Is not a valid email.' })
    @IsString()
    email: string;

    @IsNotEmpty({ message: 'Password is required.' })
    @IsString()
    @Min(8)
    password: string;
}