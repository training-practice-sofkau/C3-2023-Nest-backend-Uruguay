import { IsEmail, IsNumberString, IsUUID, IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';

export class AccountDTO {

    
    @IsString()
    @IsNotEmpty({message:'This value cannot be empty!'})
    accountTypeName: string;

    @IsString()
    @IsNotEmpty({message:'This value cannot be empty!'})
    customerId: string;

    @IsString()
    @IsNotEmpty({message:'This value cannot be empty!'})
    accountType: string;

    @IsNumber()
    balance: number = 0;

    @IsBoolean()
    state: boolean;

}