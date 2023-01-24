import { AccountTypeEntity } from "./account_type.entity";
import { CustomerEntity } from "./customer.entity";
import { v4 as uuid } from "uuid";
import { AccountModel } from '../../models/account.model';



export class AccountEntity implements AccountModel{
  id = uuid();
  customer: CustomerEntity;
  accountType: AccountTypeEntity;
  balance: number;
  state = true;
  deletedAt?: Date;
}
