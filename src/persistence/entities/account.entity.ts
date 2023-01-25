import { AccountModel } from '../../models';
import { CustomerEntity } from './customer.entity';
import { AccountTypeEntity } from './account-type.entity';
import { v4 as uuid } from 'uuid';

export class AccountEntity implements AccountModel{ 
    id = uuid();
    customer: CustomerEntity;
    accountType: AccountTypeEntity;
    balance: number;
    state: boolean;
    deletedAt: number | Date | null;  
}