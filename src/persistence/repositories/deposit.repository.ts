import { Injectable, NotFoundException } from '@nestjs/common';

import { GeneralCRUD } from './base';
import { DepositEntity } from '../entities';
import { IDepositRepository } from './interfaces';
import { PaginationModel } from '../../models';

@Injectable()
export class DepositRepository extends GeneralCRUD<DepositEntity> implements IDepositRepository {

  register(entity: DepositEntity): DepositEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: DepositEntity): DepositEntity {
    const indexCurrentEntity = this.database.findIndex(
        (item) => item.id === id && typeof item.deletedAt === undefined
    );
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as DepositEntity;
    else throw new NotFoundException();
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean): void {
    let finded = this.database.findIndex(
        (item) => 
          item.id === id
    );
    if (finded === undefined) throw new NotFoundException();
    soft ? this.softDelete(finded) : this.hardDelete(finded);
  }

  private hardDelete(index: number): void {
    this.database.splice(index, 1);
  }

  private softDelete(index: number): void {
    this.database[index].deletedAt = Date.now();
  }

  findAll(paginator?: PaginationModel): DepositEntity[] {
    let finded = this.database.filter(
        (item) => typeof item.deletedAt === undefined 
    );
    if (finded === undefined) throw new NotFoundException();
    return finded.slice(paginator?.offset, paginator?.limit);
  }

  findOneById(id: string): DepositEntity {
    let finded = this.database.find(
        (item) => 
          item.id === id &&
          typeof item.deletedAt === undefined
    );
    if (finded === undefined) throw new NotFoundException();
    return finded;
  }

  findByAccountId(accountId: string, paginator?: PaginationModel): DepositEntity[] {
    let finded = this.database.filter(
        (item) => 
          item.account.id === accountId &&
          typeof item.deletedAt === undefined
    );
    if (finded === undefined) throw new NotFoundException();
    return finded.slice(paginator?.offset, paginator?.limit);
  }

  findByDataRange(accountId: string, dateInit: Date | number, dateEnd: Date | number, paginator?: PaginationModel): DepositEntity[] {
    let finded = this.database.filter(
        (item) => 
          typeof item.deletedAt === undefined &&
          item.dateTime >= dateInit &&
          item.dateTime <= dateEnd && 
          item.account.id === accountId
    );
    if (finded === undefined) throw new NotFoundException();
    return finded.slice(paginator?.offset, paginator?.limit);
  }
}