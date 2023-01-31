import { IsEmail, IsNotEmpty, IsString, Matches, Min } from "class-validator";

export class SignInDto {

    @IsEmail(undefined, { message: 'the data provider is not a valid email.' })
    @IsString()
    username: string;

    @IsNotEmpty({ message: 'the password is required.' })
    @IsString()
    @Min(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:'Password must contain at least one lowercase letter, one uppercase letter, and one number.',
    })
    password: string;
}