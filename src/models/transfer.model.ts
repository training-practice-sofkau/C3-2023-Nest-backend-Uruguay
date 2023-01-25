import { IGeneral } from '../persistence/repositories/interfaces';
import { AccountModel } from './account.model';

export interface TransferModel extends IGeneral {
    outcome: AccountModel;
    income: AccountModel;
    balance: number;
    reason: string;
    dateTime: Date | number;
}