import { AccountModel, AccountTypeModel, CustomerModel} from '../../models';
import { v4 as uuid } from 'uuid';


export class AccountEntity implements AccountModel {
  customer: CustomerModel;
  accountType: AccountTypeModel;
  acc_Balance: number;
  deletedAt?: number | Date ;
  id = uuid();
  name: string ;
  state: boolean;

 
}
