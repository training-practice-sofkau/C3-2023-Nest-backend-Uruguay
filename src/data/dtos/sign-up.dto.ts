import { IsEmail,IsNumberString, IsUUID, IsString, Matches } from 'class-validator';

export class SignUpDto {

    @IsUUID(4, { message: "this must to be uuid" })
    documentTypeId: string;

    @IsNumberString()
    document: string;

    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsNumberString()
    phone: string;

    @IsString()
    password: string;
}