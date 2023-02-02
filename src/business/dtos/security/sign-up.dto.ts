import { IsAlphanumeric, IsEmail, IsNotEmpty, IsNumberString, IsString, IsUUID } from "class-validator";

export class SignUpDto{

    @IsUUID(4, {message:'The value provided is not a UUID valid!' })
    @IsNotEmpty({message:'This value cannot be empty!'})
    documentTypeId: string;
                     
    @IsNumberString()
    @IsNotEmpty({message:'This value cannot be empty!'})
    document: string;

    @IsNotEmpty({message:'This value cannot be empty!'})
    @IsString()
    fullname: string;

    @IsEmail()
    @IsNotEmpty({message:'This value cannot be empty!'})
    email: string;

    @IsNumberString()
    @IsNotEmpty({message:'This value cannot be empty!'})
    phone: string;

    @IsAlphanumeric()
    @IsNotEmpty({message:'This value cannot be empty!'})       
    password: string;
    
    @IsUUID(4, {message:'The value provided is not a UUID valid!' })
    @IsNotEmpty({message:'This value cannot be empty!'})
    accountTypeId: string;
}