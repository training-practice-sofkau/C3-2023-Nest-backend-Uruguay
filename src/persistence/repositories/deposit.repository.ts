import { Injectable } from '@nestjs/common';

import { GeneralCRUD } from './base';
import { DepositEntity } from '../entities';

@Injectable()
export class DepositRepository extends GeneralCRUD<DepositEntity> {

  register(entity: DepositEntity): DepositEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: DepositEntity): DepositEntity {
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

  findAll(): DepositEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): DepositEntity {
    throw new Error('This method is not implemented');
  }

  findByAccountId(accountId: string): DepositEntity[] {
    throw new Error('This method is not implemented');
  }

  findByDataRange(dateInit: Date | number, dateEnd: Date | number): DepositEntity[] {
    throw new Error('This method is not implemented');
  }
}