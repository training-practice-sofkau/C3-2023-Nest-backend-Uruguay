import { Injectable } from '@nestjs/common';
import { AccountTypeEntity } from '../entities';
import { TypesCRUD } from './base/TypesCRUD.base';

@Injectable()
export class AccountTypeRepository extends TypesCRUD implements AccountTypeEntity {
  private readonly database: Array<AccountTypeEntity>;

  constructor() {
    super();
    this.database = new Array<AccountTypeEntity>();
  }
}