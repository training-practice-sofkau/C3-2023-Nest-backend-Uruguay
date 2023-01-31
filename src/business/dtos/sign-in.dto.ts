import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Min } from "class-validator";

export class SignInDto {

    @ApiProperty()
    @IsEmail(undefined, { message: 'the data provider is not a valid email.' })
    @IsString()
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'the password is required.' })
    @IsString()
    @Min(5)
    password: string;
}