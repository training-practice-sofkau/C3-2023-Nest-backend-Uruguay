import { AccountModel } from './account.model';

export interface TransferModel extends BaseModel {
  outcome: AccountModel;
  income: AccountModel;
  transferAmount: number;
  transferReason: string;
  dateTime: Date;
  deletedAt?: Date | number
}
