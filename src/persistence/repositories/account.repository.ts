import { Injectable } from '@nestjs/common';
import { AccountEntity, AccountTypeEntity, CustomerEntity } from '../entities';
import { GeneralCRUD } from './base/GeneralCRUD.base';

@Injectable()
export class AccountRepository extends GeneralCRUD implements AccountEntity {
  private readonly database: Array<AccountEntity>;
  customer: CustomerEntity;
  accountType: AccountTypeEntity;
  balance: number;
  state: boolean;

  constructor() {
    super();
    this.database = new Array<AccountEntity>();
  }
}