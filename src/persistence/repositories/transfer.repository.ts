import { Injectable, NotFoundException } from '@nestjs/common';

import { GeneralCRUD } from './base';
import { TransferEntity } from '../entities';

@Injectable()
export class TransferRepository extends GeneralCRUD<TransferEntity> {

  register(entity: TransferEntity): TransferEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: TransferEntity): TransferEntity {
    const indexCurrentEntity = this.database.findIndex(
        (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as TransferEntity;
    else throw new NotFoundException;
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean): void {
    let finded = this.database.findIndex(
        (item) => 
          item.id === id
    );
    if (finded === undefined) throw new NotFoundException;
    soft ? this.softDelete(finded) : this.hardDelete(finded);
  }

  private hardDelete(index: number): void {
    this.database.splice(index, 1);
  }

  private softDelete(index: number): void {
    this.database[index].deletedAt = Date.now();
  }

  findAll(): TransferEntity[] {
    let finded = this.database.filter(
        (item) => typeof item.deletedAt === 'undefined',
    );
    if (finded === undefined) throw new NotFoundException;
    return finded;
  }

  findOneById(id: string): TransferEntity {
    let finded = this.database.find(
      (item) => 
        item.id === id &&
        typeof item.deletedAt === 'undefined'
    );
    if (finded === undefined) throw new NotFoundException;
    return finded;
  }

  findOutcomeByDataRange(accountId: string, dateInit: Date | number, dateEnd: Date | number): TransferEntity[] {
    let finded = this.database.filter(
      (item) => 
        item.outcome.id === accountId &&
        typeof item.deletedAt === 'undefined' &&
        item.dateTime >= dateInit &&
        item.dateTime <= dateEnd
    );
    if (finded === undefined) throw new NotFoundException;
    return finded
  }

  findIncomeByDataRange(accountId: string, dateInit: Date | number, dateEnd: Date | number): TransferEntity[] {
    let finded = this.database.filter(
        (item) => 
          item.income.id === accountId &&
          typeof item.deletedAt === 'undefined' &&
          item.dateTime >= dateInit &&
          item.dateTime <= dateEnd
      );
      if (finded === undefined) throw new NotFoundException;
      return finded
  }
}