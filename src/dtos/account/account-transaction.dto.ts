import { IsNotEmpty, IsNumber, IsUUID, IsPositive } from 'class-validator';

export class AccountTransactionDto{

    @IsUUID(4, {message:'The value provided is not a UUID valid!' })
    @IsNotEmpty({message:'This value cannot be empty!'})
    accountId:string;


    @IsNumber()
    @IsNotEmpty({message:'This value cannot be empty!'})
    @IsPositive({message:'This value less than zero!'})
    amount: number;
}