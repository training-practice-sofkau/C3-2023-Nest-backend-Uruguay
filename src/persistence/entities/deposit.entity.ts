import { AccountModel } from "src/models";
import { v4 as uuid } from "uuid";
import { DepositModel } from '../../models/deposit.model';
import { AccountEntity } from './account.entity';

export class DepositEntity implements DepositModel{
    id = uuid();
    account: AccountEntity;
    amount: number;
    dateTime: Date;
    deletedAt?: Date;

}