import { Injectable } from '@nestjs/common';
import { TransferEntity } from '../entities';
import { GeneralCRUD } from './base/GeneralCRUD.base';

@Injectable()
export class TransferRepository extends GeneralCRUD<TransferEntity> {

  constructor() {
    super();
  }
}