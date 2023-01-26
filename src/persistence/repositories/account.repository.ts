import { CRUD } from './base/';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountEntity } from '../entities';
import { AccountRepositoryInterface } from './interfaces/';

@Injectable()
export class AccountRepository
  extends CRUD<AccountEntity>
  implements AccountRepositoryInterface
{
  register(entity: AccountEntity): AccountEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === entity.id,
    );
    if (indexCurrentEntity != -1) throw new Error('The Account already exists');

    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: AccountEntity): AccountEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
    if (indexCurrentEntity === -1) throw new NotFoundException();

    this.database[indexCurrentEntity] = {
      ...this.database[indexCurrentEntity],
      ...entity,
      id,
    } as AccountEntity;

    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean | undefined): void {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );

    if (indexCurrentEntity == -1) throw new NotFoundException();

    soft ? this.softDelete(indexCurrentEntity) : this.hardDelete(indexCurrentEntity);
  }

  private hardDelete(index: number): void {
    this.database.splice(index);
  }

  private softDelete(index: number): void {
    this.database[index].deletedAt = Date.now();
  }

  findAll(): AccountEntity[] {
    return this.database.filter(
      (item) => typeof item.deletedAt === 'undefined',
    );
  }

  findOneById(id: string): AccountEntity {
    const currentEntity = this.database.find(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
    if (!currentEntity) throw new NotFoundException();

    return currentEntity;
  }

  findByState(state: boolean): AccountEntity[] {
    return this.database.filter(
      (item) => item.state === state && typeof item.deletedAt === 'undefined',
    );
  }

  findByCustomer(customerId: string): AccountEntity[] {
    return this.database.filter(
      (item) => item.customer.id === customerId && typeof item.deletedAt === 'undefined',
    );
  }

  findByAccountType(accountTypeId: string): AccountEntity[] {
    return this.database.filter(
      (item) => item.accountType.id === accountTypeId && typeof item.deletedAt === 'undefined',
    );
  }
}
