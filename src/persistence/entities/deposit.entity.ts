import { v4 as uuid } from 'uuid';
import { DepositModel } from '../../models/';
import { AccountEntity } from './';

export class DepositEntity implements DepositModel {
  id = uuid();
  account: AccountEntity;
  amount: number;
  dateTime: Date | number;
  deletedAt?: Date | number;
}
