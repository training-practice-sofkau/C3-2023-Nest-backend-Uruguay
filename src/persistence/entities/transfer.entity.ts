import {TranfersModel } from 'src/models';
import { v4 as uuid } from 'uuid';
import { AccountEntity } from './account.entity';

export class transferEntity implements TranfersModel {
  id = uuid();
  outCome: AccountEntity;
  inCome: AccountEntity;
  amount: number;
  reason: string;
  dateTime: number | Date;
  deletedAt?: number | Date;

}
