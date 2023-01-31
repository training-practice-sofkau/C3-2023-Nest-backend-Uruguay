import { IsEmail,IsNumberString, IsUUID, IsString, Matches } from 'class-validator';

export class SignUpDto {

    @IsUUID(4, { message: "this must to be uuid" })
    documentTypeId: string;

    @IsNumberString()
    document: string;

    @IsString()
    fullName: string;

    @IsEmail(undefined, { message: 'the data provider is not a valid email.' })
    email: string;

    @IsNumberString(undefined, { message: 'the data provider is not a valid number.' })
    phone: string;

    @IsString()
    password: string;
}