import { AccountModel} from '../../models';
import { v4 as uuid } from 'uuid';
import { CustomerEntity, AccountTypeEntity} from '../entities';

export class AccountEntity implements AccountModel {
  outcome: CustomerEntity;
  accountTypeId: AccountTypeEntity;
  acc_Balance: number;
  id = uuid();
  state: true;
  deletedAt?: number | Date;
}
