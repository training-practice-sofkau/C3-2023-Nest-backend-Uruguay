import { DepositModel } from '../../models';
import { GeneralCRUD } from '../repositories';
import { AccountEntity } from './account.entity';
import { v4 as uuid } from 'uuid';

export class DepositEntity extends GeneralCRUD<DepositModel> implements DepositModel {
    id = uuid();
    account: AccountEntity;
    amount: number;
    dateTime: Date | number ;
    deletedAt: number | Date | null;  
}
