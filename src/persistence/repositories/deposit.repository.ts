import { Injectable } from '@nestjs/common';
import { GeneralCRUD } from './base/GeneralCRUD.base';
import { DepositEntity } from '../entities/deposit.entity';

@Injectable()
export class DepositRepository extends GeneralCRUD<DepositEntity> {

  constructor() {
    super();
  }
}