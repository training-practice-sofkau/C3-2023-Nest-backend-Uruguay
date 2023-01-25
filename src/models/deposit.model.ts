import { AccountModel } from './account.model';
import { IGeneral } from '../persistence/repositories/interfaces';

export interface DepositModel extends IGeneral {
    account: AccountModel;
    amount: number;
    dateTime: Date | number;
}