import { IsNumberString, IsUUID, IsAlphanumeric, IsEmail, IsString  } from 'class-validator';
import { DocumentTypeModel } from 'src/data/models';

export class CustomerDto{
    
    @IsUUID()
    id: string;

    @IsNumberString()
    documentType: DocumentTypeModel;

    @IsString()
    document: string;

    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsNumberString()
    phone: string;

    @IsAlphanumeric()
    password: string;
}