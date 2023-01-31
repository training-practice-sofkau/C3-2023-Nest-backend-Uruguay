import { CustomerModel, AccountTypeModel } from '.';

export interface AccountModel extends BaseModel {
  customer: CustomerModel;
  accountType: AccountTypeModel;
  acc_Balance: number;
  deletedAt?: number | Date
}
