import { DepositModel } from '../../models';
import { AccountEntity } from '.';
import { GeneralCRUD } from '../repositories';
import { v4 as uuid } from 'uuid';

export class DepositEntity extends GeneralCRUD<DepositModel> implements DepositModel {
    id = uuid();
    account: AccountEntity;
    amount: number;
    dateTime: Date | number ;
    deletedAt?: number | Date;  
}
