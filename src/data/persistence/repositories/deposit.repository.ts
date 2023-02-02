import { DepositEntity } from '../entities/';
import { BASE } from './base/';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DespositRepositoryInterface } from './interfaces/';
import { PaginationModel } from '../../models/';

@Injectable()
export class DepositRepository
  extends BASE<DepositEntity>
  implements DespositRepositoryInterface
{
  register(entity: DepositEntity): DepositEntity {
    const indexCurrentEntity = this.findIndex(entity.id);
    if (indexCurrentEntity != -1) throw new Error('The Desposit already exists');

    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: DepositEntity): DepositEntity {
    const indexCurrentEntity = this.findIndex(id);
    if (indexCurrentEntity === -1) throw new NotFoundException();

    this.database[indexCurrentEntity] = {
      ...this.database[indexCurrentEntity],
      ...entity,
      id,
    } as DepositEntity;

    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean | undefined): void {
    const indexCurrentEntity = this.findIndex(id);
    console.log(indexCurrentEntity);

    if (indexCurrentEntity == -1) throw new NotFoundException();

    soft ? this.softDelete(indexCurrentEntity) : this.hardDelete(indexCurrentEntity);
  }

  private hardDelete(index: number): void {
    this.database.splice(index);
  }

  private softDelete(index: number): void {
    this.database[index].deletedAt = Date.now();
  }

  findAll(pagination: PaginationModel): DepositEntity[] {
    const paginations = this.paginationMethod(pagination);

    return this.database.filter(
      (item) => typeof item.deletedAt === 'undefined',
    ).slice(paginations.offset, paginations.offset + (paginations.limit || 0));
  }

  findOneById(id: string): DepositEntity {
    const currentEntity = this.database.find(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
    if (!currentEntity) throw new NotFoundException();

    return currentEntity;
  }

  findByAccountId(pagination: PaginationModel ,accountId: string): DepositEntity[] {
    const paginations = this.paginationMethod(pagination);

    const currentEntity = this.database.filter(
      (item) => item.account.id === accountId && typeof item.deletedAt === 'undefined',
    );
    if (!currentEntity) throw new NotFoundException();

    return currentEntity;
  }

  findByDataRange(
    pagination: PaginationModel,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): DepositEntity[] {
    const paginations = this.paginationMethod(pagination);

    return this.database.filter(
      (item) => item.dateTime >= dateInit && item.dateTime <= dateEnd && typeof item.deletedAt === 'undefined',
    ).slice(paginations.offset, pagination.offset + (pagination.limit || 0));
  }

  findByAccountIdAndDataRange(
    pagination: PaginationModel,
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): DepositEntity[]  {
    const paginations = this.paginationMethod(pagination);

    console.log(paginations);

    return this.database.filter(
      (item) => item.account.id === accountId && item.dateTime >= dateInit && item.dateTime <= dateEnd && typeof item.deletedAt === 'undefined',
    ).slice(paginations.offset, paginations.offset + (paginations.limit || 0));
  }

  private findIndex(id: string): number {
    return this.database.findIndex(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
  }

  private paginationMethod(pagination: PaginationModel): PaginationModel {
    if(typeof pagination.offset === 'undefined') pagination.offset = 0;
    if(typeof pagination.limit === 'undefined') pagination.limit = 10;

    return pagination;
  }
}
