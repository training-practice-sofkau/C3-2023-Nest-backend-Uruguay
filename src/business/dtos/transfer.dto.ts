import { IsNotEmpty, IsPositive, IsString, IsUUID } from 'class-validator';

export class TransferDto {

    @IsNotEmpty()
    @IsUUID()
    outcome: string;

    @IsNotEmpty()
    @IsUUID()
    income: string;

    @IsPositive()
    @IsNotEmpty()
    amount: number;

    @IsString()
    @IsNotEmpty()
    reason: string;
}