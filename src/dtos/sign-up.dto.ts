import { IsEmail,IsNumberString, IsUUID, IsString, Min } from 'class-validator';

export class SignUpDto {

    @IsUUID(4, { message: "this must to be uuid" })
    documentTypeId: string;

    @IsNumberString(undefined, { message: 'the document must to be a number.' })
    document: string;

    @IsString({ message: 'the full name is not a string.' })
    fullName: string;

    @IsEmail(undefined, { message: 'the data provider is not a valid email.' })
    email: string;

    @IsNumberString({ message: "phne must to be a number." })
    phone: string;

    @IsString({ message: "password is not a string." })
    @Min(5)
    password: string;
    
}