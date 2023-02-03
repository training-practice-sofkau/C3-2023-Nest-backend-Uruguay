import { IsNotEmpty, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';

export class UpdateTransferDto {

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    outcome: string;

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    income: string;

    @IsOptional()
    @IsPositive()
    @IsNotEmpty()
    amount: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    reason: string;
}