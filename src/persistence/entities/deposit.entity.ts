import { AccountModel, depositModel } from 'src/models';
import { v4 as uuid } from 'uuid';

export class DepositEntity implements depositModel{
    id = uuid();
    account: AccountModel;
    amount: number;
    dateTime: number | Date;
    daletedAt?: number | Date;

}