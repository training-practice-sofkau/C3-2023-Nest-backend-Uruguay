import { Injectable } from '@nestjs/common';
import { GeneralCRUD } from './base/GeneralCRUD.base';
import { AccountTypeEntity } from '../entities';

@Injectable()
export class AccountTypeRepository extends GeneralCRUD<AccountTypeEntity> {

  constructor() {
    super();
  }
}