import { IsNumber, IsPositive, IsString } from 'class-validator';

export class DepositDto{
    
    @IsString()
    accountId: string;
    
    
    @IsNumber()
    @IsPositive()
    amount: number;

}