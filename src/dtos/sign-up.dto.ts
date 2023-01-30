import { IsAlphanumeric, IsEmail, IsNotEmpty, IsNumberString, IsString, IsUUID, Matches } from "class-validator/types/decorator/decorators";

export class SignUpDto{

    @IsUUID(4, {message:'The value provided is not a UUID valid!' })
    @IsNotEmpty()
    documentTypeId: string;
                     
    @IsNumberString()
    @IsNotEmpty()
    document: string;

    @IsNotEmpty()
    @IsString()
    fullname: string;

    @IsEmail()
    email: string;

    @IsNumberString()
    phone: string;

    @IsAlphanumeric()
    @IsNotEmpty()
    //@Matches()
    password: string;
    
}