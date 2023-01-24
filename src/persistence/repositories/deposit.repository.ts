import { Injectable } from '@nestjs/common';
import { DepositEntity, AccountEntity } from '../entities';
import { GeneralCRUD } from './base/GeneralCRUD.base';

@Injectable()
export class DepositRepository extends GeneralCRUD implements DepositEntity {
  private readonly database: Array<DepositEntity>;
  account: AccountEntity;
  amount: number;
  dateTime: number | Date;

  constructor() {
    super();
    this.database = new Array<DepositEntity>();
  }
}