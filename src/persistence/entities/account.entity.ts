import { CustomerEntity } from './customer.entity';
import { AccountModel} from 'src/models';
import { v4 as uuid } from 'uuid';
import { AccountTypeEntity } from './accountType.entity';

export class AccountEntity implements AccountModel{   
    id= uuid();
    outcome: CustomerEntity;
    accountTypeId: AccountTypeEntity;
    acc_Balance: number;
    state: boolean;
    daletedAt?: Date | number;
}