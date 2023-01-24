import { AccountModel, AccountTypeModel, CustomerModel} from 'src/models';
import { v4 as uuid } from 'uuid';

export class AccountEntity implements AccountModel{
    outcome: CustomerModel;
    accountTypeId: AccountTypeModel;
    acc_Balance: number;
    id = uuid(); 
    state: boolean;
    deletedAt?: number | Date ;
  

}