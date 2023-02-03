import { IsAlphanumeric, IsBoolean, IsEmail, IsNotEmpty, IsNumberString, IsString, IsUrl, IsUUID, Matches, Min } from "class-validator";

export class UpdateCustomerDto{

    @IsUUID(4, {message:'The value provided is not a UUID valid!'})    
    documentTypeId: string;
                     
    @IsNumberString()    
    document: string;
    
    @IsString()
    fullname: string;

    @IsEmail()    
    email: string;

    @IsNumberString()    
    phone: string;

    @IsAlphanumeric()      
    password: string;
    
    @IsBoolean({message:'The value provided is not true or false!'})
    state: boolean;

    @IsUrl()
    avatarUrl: string;
}