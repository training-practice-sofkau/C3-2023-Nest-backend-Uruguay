import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

import { AccountEntity } from '../persistence/entities';

export class DepositDto {

    @IsNotEmpty()
    account: AccountEntity;

    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    amount: number;

}