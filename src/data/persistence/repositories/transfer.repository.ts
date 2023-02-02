import { Injectable, NotFoundException } from '@nestjs/common';

import { GeneralCRUD } from './base';
import { TransferEntity } from '../entities';
import { ITransferRepositoryInterface } from './interfaces';
import { PaginationModel } from '../../models';

@Injectable()
export class TransferRepository extends GeneralCRUD<TransferEntity> implements ITransferRepositoryInterface {

  public static instance: TransferRepository;

  public static getInstance(): TransferRepository {
    if (!TransferRepository.instance) {
      TransferRepository.instance = new TransferRepository();
    }
    return TransferRepository.instance;
  }

  register(entity: TransferEntity): TransferEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: TransferEntity): TransferEntity {
    const indexCurrentEntity = this.database.findIndex(
        (item) => item.id == id && item.deletedAt == undefined
    );
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as TransferEntity;
    else throw new NotFoundException();
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean): void {
    let finded = this.database.findIndex(
        (item) => 
          item.id == id
    );
    if (finded == undefined) throw new NotFoundException();
    soft ? this.softDelete(finded) : this.hardDelete(finded);
  }

  private hardDelete(index: number): void {
    this.database.splice(index, 1);
  }

  private softDelete(index: number): void {
    this.database[index].deletedAt = Date.now();
  }

  findAll(paginator?: PaginationModel): TransferEntity[] {
    let finded = this.database.filter(
        (item) => item.deletedAt == undefined
    );
    if (finded == undefined) throw new NotFoundException();
    return finded.slice(paginator?.offset, paginator?.limit);
  }

  findOneById(id: string): TransferEntity {
    let finded = this.database.find(
      (item) => 
        item.id == id &&
        item.deletedAt == undefined
    );
    if (finded == undefined) throw new NotFoundException();
    return finded;
  }

  findByIncomeId(incomeId: string, paginator?: PaginationModel): TransferEntity[] {
    let finded = this.database.filter(
        (item) => 
          item.income.id == incomeId &&
          item.deletedAt == undefined
    );
    if (finded == undefined) throw new NotFoundException();
    return finded.slice(paginator?.offset, paginator?.limit);
  }

  findByOutcomeId(outcomeId: string, paginator?: PaginationModel): TransferEntity[] {
    let finded = this.database.filter(
        (item) => 
          item.outcome.id == outcomeId &&
          item.deletedAt == undefined
    );
    if (finded == undefined) throw new NotFoundException();
    return finded.slice(paginator?.offset, paginator?.limit);
  }

  findOutcomeByDataRange(accountId: string, dateInit: Date | number, dateEnd: Date | number, paginator?: PaginationModel): TransferEntity[] {
    let finded = this.database.filter(
      (item) => 
        item.outcome.id == accountId &&
        item.deletedAt == undefined &&
        item.dateTime >= dateInit &&
        item.dateTime <= dateEnd
    );
    if (finded == undefined) throw new NotFoundException();
    return finded.slice(paginator?.offset, paginator?.limit);
  }

  findIncomeByDataRange(accountId: string, dateInit: Date | number, dateEnd: Date | number, paginator?: PaginationModel): TransferEntity[] {
    let finded = this.database.filter(
        (item) => 
          item.income.id == accountId &&
          item.deletedAt == undefined &&
          item.dateTime >= dateInit &&
          item.dateTime <= dateEnd
      );
      if (finded == undefined) throw new NotFoundException();
      return finded.slice(paginator?.offset, paginator?.limit);
  }
}