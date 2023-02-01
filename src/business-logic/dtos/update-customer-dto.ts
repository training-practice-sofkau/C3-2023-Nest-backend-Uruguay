import { IsEmail, IsNumberString, IsUUID, IsString, IsBoolean } from 'class-validator';

export class UpdateCustomerDTO {

    @IsUUID(4, { message: "this must to be uuid" })
    documentType: string;

    @IsNumberString()
    document: string;

    @IsEmail()
    email: string;

    @IsString()
    fullName: string;

    @IsString()
    password: string;

    @IsNumberString()
    phone: string;

    @IsBoolean()
    state: boolean;

}