import { IsBoolean, IsNumber, IsString, IsUUID } from "class-validator";

export class AccountDto{

    @IsUUID(4, {message:'The value provided is not a UUID valid!' })    
    accountId: string;

    @IsUUID(4, {message:'The value provided is not a UUID valid!' })    
    accountTypeId: string;
    
    @IsString()
    accountTypeName: string;

    @IsUUID(4, {message:'The value provided is not a UUID valid!' })    
    customerId: string;

    @IsString()
    customerName: string;
    
    @IsNumber()
    balance : number;

    @IsBoolean()
    state : boolean;
    
    deletedAt?: number | Date;
}