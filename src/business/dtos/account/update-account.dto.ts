import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsUUID, Min } from "class-validator";

export class UpdateAccountDto{
 
    @IsUUID(4, {message:'The value provided is not a UUID valid!' })    
    customerId: string;

    @IsUUID(4, {message:'The value provided is not a UUID valid!' })
    accountTypeId: string;

    @IsNumber()
    @IsPositive({message:'This value must be bigger than 0!'})      
    balance: number;

    @IsBoolean({message:'The value provided is not true or false!' })
    state: boolean;
 
}