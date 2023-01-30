import { IsNumberString, IsUUID } from 'class-validator';
import { DocumentTypeModel } from 'src/models';
import { IsAlphanumeric, IsEmail, IsString } from 'class-validator/types/decorator/decorators';

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