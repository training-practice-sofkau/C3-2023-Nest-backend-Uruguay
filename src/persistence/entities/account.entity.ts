import { AccountModel, AccountTypeModel, CustomerModel} from 'src/models';
import { v4 as uuid } from 'uuid';


export class AccountEntity implements AccountModel {
  id = uuid();
  customer: CustomerModel;
  accountType: AccountTypeModel;
  balance: number;
  state: boolean;
  deletedAt?: number | Date;

}
