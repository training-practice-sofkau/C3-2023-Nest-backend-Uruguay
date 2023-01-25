import { Injectable } from '@nestjs/common';
import { TransferEntity, AccountEntity } from '../entities';
import { GeneralCRUD } from './base/GeneralCRUD.base';

@Injectable()
export class TransferRepository extends GeneralCRUD implements TransferEntity {
  private readonly database: Array<TransferEntity>;
  outcome: AccountEntity;
  income: AccountEntity;
  balance: number;
  reason: string;
  dateTime: number | Date;

  constructor() {
    super();
    this.database = new Array<TransferEntity>();
  }
}