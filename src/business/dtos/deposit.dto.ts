import { IsNotEmpty, IsNumber, IsPositive, IsUUID, IsOptional } from 'class-validator';

import { AccountEntity } from '../../data/persistence/entities';

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