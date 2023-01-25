import { Injectable } from '@nestjs/common';
import { GeneralCRUD } from './base';
import { TransferEntity } from '../entities';

@Injectable()
export class TransferRepository extends GeneralCRUD<TransferEntity> {

  constructor() {
    super();
  }
}