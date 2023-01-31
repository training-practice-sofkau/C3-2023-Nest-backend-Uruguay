import { AccountModel, TransferModel } from '../../models';
import { v4 as uuid } from 'uuid';

export class TransferEntity implements TransferModel {
  income: AccountModel;
  id = uuid();
  outcome: AccountModel;
  transferAmount: number;
  transferReason: string;
  dateTime: Date | number;
  state: true  | false;
  deletedAt: Date | number
}
