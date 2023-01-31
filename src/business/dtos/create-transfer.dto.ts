import { IsString, IsNumber, IsPositive, IsUUID } from 'class-validator';
export class CreateTransferDTO {

    @IsString({message: 'OutCome: Id String Requiered'})
    @IsUUID()
    outcome: string;
    
    @IsString({message: 'Income: Id String Requiered'})
    @IsUUID()
    income: string;
    
    @IsNumber(undefined, {message: 'Amount: Number Requiered'})
    @IsPositive({message: 'Amount: Positive Number Requiered'})
    amount: number;

    @IsString({message: 'Reason: Id String Requiered'})
    reason: string;
}