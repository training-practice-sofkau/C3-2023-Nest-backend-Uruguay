import { AccountModel} from '../../models';
import { v4 as uuid } from 'uuid';
import { CustomerEntity } from './customer.entity';
import { AccountTypeEntity } from './accountType.entity';


export class AccountEntity implements AccountModel {
  customer: CustomerEntity;
  accountType: AccountTypeEntity;
  acc_Balance: number;
  deletedAt?: number | Date ;
  id = uuid();
  name: string ;
  state: boolean ;

 
}
