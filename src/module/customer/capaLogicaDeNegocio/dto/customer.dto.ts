import { IsEmail,IsNumberString, IsString } from 'class-validator';

export class CustomerDto{

    @IsString()
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