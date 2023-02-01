import { IsString, IsNumberString, IsEmail, IsBoolean } from 'class-validator';
export class UpdateCustomerDTO {

    @IsString({message: 'DocumentType: Id String Requiered'})
    documentType: string;
    
    @IsNumberString(undefined, {message: 'document: NumberString Requiered'})
    document: string;

    @IsEmail(undefined, {message: 'Email: Correct Email Requiered'})
    email: string;

    @IsString({message: 'FullName: String Requiered'})
    fullName: string;

    @IsNumberString(undefined, {message: 'Password: NumberString Requiered'})
    password: string;

    @IsNumberString(undefined, {message: 'Phone: NumberString Requiered'})
    phone: string;

    @IsBoolean({message: 'State: Boolean Requiered'})
    state: boolean;
}