import { IsEmail,IsNumberString, IsString } from 'class-validator';

export class SignUpDto {

    @IsString()
    documentTypeId: string;
    
    @IsString()
    accountTypeId: string;

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