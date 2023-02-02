import { AccountTypeEntity } from '../entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BASE } from './base';
import { AccountTypeRepositoryInterface } from './interfaces';
import { PaginationModel } from '../../models/pagination-model.model';

@Injectable()
export class AccountTypeRepository
  extends BASE<AccountTypeEntity>
  implements AccountTypeRepositoryInterface
{
  register(entity: AccountTypeEntity): AccountTypeEntity {
    const indexCurrentEntity = this.findIndex(entity.id)
    if (indexCurrentEntity === -1) this.database.push(entity);

    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    const indexCurrentEntity = this.findIndex(id);
    if (indexCurrentEntity === -1) throw new NotFoundException();

    this.database[indexCurrentEntity] = {
      ...this.database[indexCurrentEntity],
      ...entity,
      id,
    } as AccountTypeEntity;

    return this.database[indexCurrentEntity];
  }

  delete(id: string): void {
    const indexCurrentEntity = this.findIndex(id);

    if (indexCurrentEntity == -1) throw new NotFoundException();

    this.database.splice(indexCurrentEntity);
  }

  findAll(pagination: PaginationModel): AccountTypeEntity[] {
    const paginations = this.paginationMethod(pagination);

    return this.database.slice(paginations.offset, paginations.offset + (paginations.limit || 0));
  }

  findOneById(id: string): AccountTypeEntity {
    const currentEntity = this.database.find(
      (item) => item.id === id
    );
    if (!currentEntity) throw new NotFoundException();

    return currentEntity;
  }

  findByState(pagination: PaginationModel, state: boolean): AccountTypeEntity[] {
    const paginations = this.paginationMethod(pagination);

    return this.database.filter(
      (item) => item.state === state
    ).slice(paginations.offset, paginations.offset + (paginations.limit || 0));
  }

  findByName(pagination: PaginationModel,name: string): AccountTypeEntity[] {
    const paginations = this.paginationMethod(pagination);

    return this.database.filter(
      (item) =>
        item.name === name
    ).slice(paginations.offset, paginations.offset + (paginations.limit || 0));
  }

  private findIndex(id: string): number {
    return this.database.findIndex(
      (item) => item.id === id
    );
  }

  private paginationMethod(pagination: PaginationModel): PaginationModel {
    return pagination = {
      ... {offset: 0, limit: 10},
      ... pagination
    }
  }

}
