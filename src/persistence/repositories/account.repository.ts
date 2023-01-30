import { BASE } from './base/';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountEntity } from '../entities';
import { AccountRepositoryInterface } from './interfaces/';
import { PaginationModel } from '../../models/pagination-model.model';

@Injectable()
export class AccountRepository
  extends BASE<AccountEntity>
  implements AccountRepositoryInterface
{
  register(entity: AccountEntity): AccountEntity {
    const indexCurrentEntity = this.findIndex(entity.id);
    if (indexCurrentEntity != -1) throw new Error('The Account already exists');

    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: AccountEntity): AccountEntity {
    const indexCurrentEntity = this.findIndex(id);
    if (indexCurrentEntity === -1) throw new NotFoundException();

    this.database[indexCurrentEntity] = {
      ...this.database[indexCurrentEntity],
      ...entity,
      id,
    } as AccountEntity;

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

  findAll(pagination: PaginationModel): AccountEntity[] {
    const paginations = this.paginationMethod(pagination);

    return this.database.filter(
      (item) => typeof item.deletedAt === 'undefined',
    ).slice(paginations.offset, paginations.offset + (paginations.limit || 0));
  }

  findOneById(id: string): AccountEntity {
    const currentEntity = this.database.find(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
    if (!currentEntity) throw new NotFoundException();

    return currentEntity;
  }

  findByState(pagination: PaginationModel ,state: boolean): AccountEntity[] {
    const paginations = this.paginationMethod(pagination);

    return this.database.filter(
      (item) => item.state === state && typeof item.deletedAt === 'undefined',
    ).slice(paginations.offset, paginations.offset + (paginations.limit || 0));
  }

  findByCustomer(customerId: string): AccountEntity[] {
    return this.database.filter(
      (item) => item.customer.id === customerId && typeof item.deletedAt === 'undefined',
    );
  }

  findByAccountType(pagination: PaginationModel ,accountTypeId: string): AccountEntity[] {
    const paginations = this.paginationMethod(pagination);

    return this.database.filter(
      (item) => item.accountType.id === accountTypeId && typeof item.deletedAt === 'undefined',
    ).slice(paginations.offset, paginations.offset + (paginations.limit || 0));
  }

  private findIndex(id: string): number {
    return this.database.findIndex(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
  }

  private paginationMethod(pagination: PaginationModel): PaginationModel {
    return pagination = {
      ... {offset: 0, limit: 20},
      ... pagination
    }
  }
}
