import { IsEmail,IsNumberString, IsString } from 'class-validator';

export class CreateCustomerDto{
    @IsString()
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