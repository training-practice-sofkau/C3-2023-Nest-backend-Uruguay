import { DepositModel } from '../../models';
import { AccountEntity } from './';
import { v4 as uuid } from 'uuid';

export class DepositEntity implements DepositModel {
  accountid: AccountEntity;
  amount: number;
  date_time: Date;
  id = uuid();
  state: true;
  deletedAt?: number | Date;
}
