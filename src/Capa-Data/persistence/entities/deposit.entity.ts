import { v4 as uuid } from 'uuid';
import { depositModel } from '../../models/deposit.model';
import { AccountEntity } from './account.entity';

export class depositEntity implements depositModel {
  id = uuid();
  account: AccountEntity;
  amount: number;
  deletedAt?: number | Date;
  dateTime: number | Date;
}
