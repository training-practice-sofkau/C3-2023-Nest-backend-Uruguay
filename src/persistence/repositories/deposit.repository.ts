import { Injectable } from '@nestjs/common';
import { GeneralCRUD } from './base';
import { DepositEntity } from '../entities';

@Injectable()
export class DepositRepository extends GeneralCRUD<DepositEntity> {

  constructor() {
    super();
  }
}