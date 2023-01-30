import { IsEmail,IsNumberString, IsUUID, IsString } from 'class-validator';

export class CustomerDto{

    @IsUUID(4, { message: "this must to be uuid" })
    documentType: string ;//DocumentTypeModel , es un tipo de dato que nosotros creamos
   
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