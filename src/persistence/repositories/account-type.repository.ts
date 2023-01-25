import { Injectable } from '@nestjs/common';
import { GeneralCRUD } from './base';
import { AccountTypeEntity } from '../entities';

@Injectable()
export class AccountTypeRepository extends GeneralCRUD<AccountTypeEntity> {

  constructor() {
    super();
  }
}