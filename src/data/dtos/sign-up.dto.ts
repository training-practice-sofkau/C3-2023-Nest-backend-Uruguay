import { IsNumberString, IsString, IsEmail, IsOptional } from "class-validator";

export class SignUpDto {
/*
    @IsUUID(4, { message: "this must to be uuid" })
    documentTypeId: string;
*/
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
    
    @IsString()
    accountTypeName: string;

    @IsString()
    documentTypeName: string;

    @IsNumberString()
    @IsOptional()
    balance?: number;
}