import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

import { AccountEntity } from '../../data/persistence/entities';

export class TransferDto {

    @IsNotEmpty()
    outcome: AccountEntity;

    @IsNotEmpty()
    income: AccountEntity;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    amount: number;

    @IsString()
    @IsNotEmpty()
    reason: string;
}