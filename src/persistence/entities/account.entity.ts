import { AccountModel} from 'src/models';
import { v4 as uuid } from 'uuid';
import { CustomerEntity, AccountTypeEntity } from '../entities';

export class AccountEntity implements AccountModel {
  id = uuid();
  accountType: AccountTypeEntity;
  name: string;
  customer: CustomerEntity;
  balance: number;
  state = true;
  deletedAt?: number | Date;
}
