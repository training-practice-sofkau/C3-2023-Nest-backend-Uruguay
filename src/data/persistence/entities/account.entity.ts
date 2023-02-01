import { AccountTypeEntity, CustomerEntity } from "./";
import { v4 as uuid } from "uuid";
import { AccountModel } from '../../models/';



export class AccountEntity implements AccountModel{
  id = uuid();
  customer: CustomerEntity;
  accountType: AccountTypeEntity;
  balance: number = 0;
  state = true;
  deletedAt?: Date | number;
}
