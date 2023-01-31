import { IsPositive, IsString, IsUUID } from 'class-validator'
export class createTransferDto {
    
    @IsUUID()
    outcome: string;
    
    @IsUUID()
    income : string ;
    
    @IsPositive()
    amount: number;

    @IsString()
    reason : string;


}