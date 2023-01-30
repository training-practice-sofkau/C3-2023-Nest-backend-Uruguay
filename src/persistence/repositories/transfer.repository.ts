import { TransferEntity } from '../entities/';
import { BASE } from './base/';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TransferRepositoryInterface } from './interfaces/';
import { PaginationModel } from '../../models/pagination-model.model';

@Injectable()
export class TransferRepository
  extends BASE<TransferEntity>
  implements TransferRepositoryInterface
{
  register(entity: TransferEntity): TransferEntity {
    const indexCurrentEntity = this.findIndex(entity.id);
    if (indexCurrentEntity != -1) throw new Error('The Transfer already exists');

    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: TransferEntity): TransferEntity {
    const indexCurrentEntity = this.findIndex(id);
    if (indexCurrentEntity === -1) throw new NotFoundException();

    this.database[indexCurrentEntity] = {
      ...this.database[indexCurrentEntity],
      ...entity,
      id,
    } as TransferEntity;

    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean | undefined): void {
    const indexCurrentEntity = this.findIndex(id);

    if (indexCurrentEntity == -1) throw new NotFoundException();

    soft ? this.softDelete(indexCurrentEntity) : this.hardDelete(indexCurrentEntity);
  }

  private hardDelete(index: number): void {
    this.database.splice(index);
  }

  private softDelete(index: number): void {
    this.database[index].deletedAt = Date.now();
  }

  findAll(pagination: PaginationModel): TransferEntity[] {
    const paginations = this.paginationMethod(pagination);

    return this.database.filter(
      (item) => typeof item.deletedAt === 'undefined',
    ).slice(pagination.offset, pagination.offset + (pagination.limit || 0));
  }

  findOneById(id: string): TransferEntity {
    const currentEntity = this.database.find(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
    if (!currentEntity) throw new NotFoundException();

    return currentEntity;
  }

  findByAccountIdAndDataRange(
    pagination: PaginationModel,
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): TransferEntity[]  {
    const paginations = this.paginationMethod(pagination);

    return this.database.filter(
      (item) => (item.income.id === accountId || item.outcome.id === accountId) && item.dateTime >= dateInit && item.dateTime <= dateEnd && typeof item.deletedAt === 'undefined',
    ).slice(paginations.offset, paginations.offset + (paginations.limit || 0));
  }

  findOutcomeByDataRange(
    pagination: PaginationModel,
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): TransferEntity[] {
    const paginations = this.paginationMethod(pagination);

    return this.database.filter(
      (item) => item.outcome.id === accountId && item.dateTime >= dateInit && item.dateTime <= dateEnd && typeof item.deletedAt === 'undefined',
    ).slice(paginations.offset, paginations.offset + (paginations.limit || 0));
  }

  findIncomeByDataRange(
    pagination: PaginationModel,
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): TransferEntity[] {
    const paginations = this.paginationMethod(pagination);

    return this.database.filter(
      (item) => item.income.id === accountId && item.dateTime >= dateInit && item.dateTime <= dateEnd && typeof item.deletedAt === 'undefined',
    ).slice(paginations.offset, paginations.offset + (paginations.limit || 0));
  }

  private findIndex(id: string): number {
    return this.database.findIndex(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
  }

  private paginationMethod(pagination: PaginationModel): PaginationModel {
    return pagination = {
      ... {offset: 0, limit: 10},
      ... pagination
    }
  }
}
