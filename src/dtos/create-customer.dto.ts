import { IsEmail, IsNumberString, IsString } from 'class-validator';
export class CreateCustomerDTO {

    @IsString({message: 'An Id string required'})
    documentType: string;
    
    @IsNumberString(undefined, {message: 'Document: NumberString required'})
    document: string;
    
    @IsEmail(undefined, {message: 'Email: Correct Email required'})
    email: string;
    
    @IsString({message: 'FullName: String required'})
    fullName: string;
    
    @IsNumberString(undefined, {message: 'Password: NumberString required'})
    password: string;
    
    @IsNumberString(undefined, {message: 'Phone: Number required'})
    phone: string;
}