import { AccountModel } from '../../models';
import { AccountTypeEntity, CustomerEntity } from '.';
import { GeneralCRUD } from '../repositories';
import { v4 as uuid } from 'uuid';

export class AccountEntity extends GeneralCRUD<AccountModel> implements AccountModel{ 
    id = uuid();
    customer: CustomerEntity;
    accountType: AccountTypeEntity;
    balance: number;
    state: boolean;
    deletedAt: number | Date | null;  
}