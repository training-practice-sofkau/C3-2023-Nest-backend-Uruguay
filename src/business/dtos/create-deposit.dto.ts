import { IsNumber, IsPositive, IsString } from 'class-validator';
export class CreateDepositDTO {

    @IsString({message: 'An Id Number required'})
    accountId: string;

    @IsNumber(undefined, {message: 'Amount Number required'})
    @IsPositive({message: 'Amount: Positive Number Requiered'})
    amount: number;
}