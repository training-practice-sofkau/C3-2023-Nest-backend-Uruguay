import { AccountModel, AccountTypeModel} from '../../models';
import { v4 as uuid } from 'uuid';
import { CustomerEntity} from '../entities';

export class AccountEntity implements AccountModel {
  accountType: AccountTypeModel;
  name: string ;
  customer: any;
  outcome: CustomerEntity;
  acc_Balance: number;
  id = uuid();
  state: true  | false;;
  deletedAt?: number | Date;
}
