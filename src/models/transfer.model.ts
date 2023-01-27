import { AccountTypeModel } from '../models';

export interface TransferModel extends BaseModel {
  outcome: AccountTypeModel;
  accountTypeId: AccountTypeModel;
  transferAmount: number;
  transferReason: string;
  dateTime: Date;
}
