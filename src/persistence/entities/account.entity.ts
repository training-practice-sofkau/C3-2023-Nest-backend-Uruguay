import { AccountModel } from '../../models';
import { CustomerEntity } from './customer.entity';
import { AccountTypeEntity } from './account-type.entity';
import { v4 as uuid } from 'uuid';
import { GeneralCRUD } from '../repositories';

export class AccountEntity extends GeneralCRUD<AccountModel> implements AccountModel{ 
    id = uuid();
    customer: CustomerEntity;
    accountType: AccountTypeEntity;
    balance: number;
    state: boolean;
    deletedAt: number | Date | null;  
}