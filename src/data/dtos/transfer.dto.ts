import { IsString, IsUUID, IsNumber, IsPositive } from 'class-validator';

export class TransferDto {

    @IsUUID()
    outcome: string

    @IsUUID()
    income: string

    @IsNumber()
    @IsPositive()
    amount: number

    @IsString()
    reason: string
}