import { IsEmail, IsNumberString, IsUUID, IsString } from 'class-validator';

export class CreateCustomerDto{

    @IsUUID(4, { message: "this must to be uuid" })
    documentType: string ; 
   
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