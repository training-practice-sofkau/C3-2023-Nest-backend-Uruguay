import { IsNotEmpty, IsNumber, IsPositive, IsUUID, IsOptional } from 'class-validator';

export class DepositDto {

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    account: string;

    @IsOptional()
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    amount: number;

}