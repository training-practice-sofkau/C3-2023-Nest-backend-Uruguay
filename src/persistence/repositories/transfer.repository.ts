import { Injectable } from '@nestjs/common';

import { GeneralCRUD } from './base';
import { TransferEntity } from '../entities';

@Injectable()
export class TransferRepository extends GeneralCRUD<TransferEntity> {

  register(entity: TransferEntity): TransferEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: TransferEntity): TransferEntity {
    throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean): void {
    throw new Error('This method is not implemented');
  }

  private hardDelete(index: number): void {
    throw new Error('This method is not implemented');
  }

  private softDelete(index: number): void {
    throw new Error('This method is not implemented');
  }

  findAll(): TransferEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): TransferEntity {
    throw new Error('This method is not implemented');
  }

  findOutcomeByDataRange(accountId: string, dateInit: Date | number, dateEnd: Date | number): TransferEntity[] {
    throw new Error('This method is not implemented');
  }

  findIncomeByDataRange(accountId: string, dateInit: Date | number, dateEnd: Date | number): TransferEntity[] {
    throw new Error('This method is not implemented');
  }
}