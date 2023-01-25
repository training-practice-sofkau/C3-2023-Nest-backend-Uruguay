import { Injectable } from '@nestjs/common';
import { GeneralCRUD } from './base/GeneralCRUD.base';
import { AccountEntity } from '../entities';

@Injectable()
export class AccountRepository extends GeneralCRUD<AccountEntity> {

  constructor() {
    super();
  }
}