import { IsAlphanumeric, IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPositive, IsString, IsUUID, Matches, Min } from "class-validator";
 
export class SignUpDto{

    @IsString()
    @IsNotEmpty({message:'This value cannot be empty!'})
    documentTypeName: string;
                     
    @IsNumberString()
    @IsNotEmpty({message:'This value cannot be empty!'})
    document: string;

    @IsNotEmpty({message:'This value cannot be empty!'})
    @IsString()
    fullName: string;

    @IsEmail()
    @IsNotEmpty({message:'This value cannot be empty!'})
    email: string;

    @IsNumberString()
    @IsNotEmpty({message:'This value cannot be empty!'})
    phone: string;

    @IsAlphanumeric()
    @IsNotEmpty({message:'This value cannot be empty!'})    
    @Min(5, {message: 'Password must be at least 5 characters long!'})
    password: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    balance?: number;

    @IsString()
    @IsNotEmpty({message:'This value cannot be empty!'})
    accountTypeName: string;
}