import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountEntity } from '../entities';

import { BaseRepository } from './base';
import { AccountRepositoryInterface } from './interfaces';

@Injectable()
export class AccountRepository
  extends BaseRepository<AccountEntity>
  implements AccountRepositoryInterface
{
  searchByAttributesforOne(
    attributes: keyof AccountEntity,
    dataToSearch: string,
  ): AccountEntity {
    const currentEntity = this.database.find(
      (entity) => entity[attributes] === dataToSearch,
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException();
  }

  searchByAttributes(
    attributes: keyof AccountEntity,
    dataToSearch: string,
  ): AccountEntity[] {
    const currentEntity = this.database.filter(
      (entity) => entity[attributes] === dataToSearch,
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException();
  }

  register(entity: AccountEntity): AccountEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: AccountEntity): AccountEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as AccountEntity;
    else throw new NotFoundException();
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean): void {
    const index = this.database.findIndex((item) => item.id === id);

    if (soft === true) {
      this.hardDelete(index);
    } else {
      this.softDelete(index);
    }
  }

  private hardDelete(index: number): void {
    this.database.splice(index, 1);
  }

  private softDelete(index: number): void {
    this.database[index].state = false;
    this.database[index].deletedAt = Date.now();
  }

  findAll(): AccountEntity[] {
    return this.database.filter(
      (item) => typeof item.deletedAt === 'undefined',
    );
  }

  findByState(state: boolean): AccountEntity[] {
    return this.database.filter((item) =>
      state === true ? item.state === true : item.state !== true,
    );
  }

  findByCustomer(customerId: string): AccountEntity[] {
    const currentEntity = this.database.filter(
      (item) => item.customer.id === customerId,
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException();
  }

  getBalance(id: string, amount?: number, deposit?: boolean): number {
    const index = this.database.findIndex((item) => item.id === id);

    let accountBalance = this.database[index].acc_Balance;

    if (!amount) {
      return accountBalance;
    }

    let newBalance: number;
    if (deposit) {
      newBalance = accountBalance + amount;
    } else {
      if (accountBalance - amount < 0) {
        throw new Error('Saldo insuficiente');
      }
      newBalance = accountBalance - amount;
    }
    this.database[index].acc_Balance = newBalance;
    return newBalance;
  }

  getStateAndChange(accountId: string, state?: boolean): boolean {
    const index = this.database.findIndex((item) => item.id === accountId);
    const currentEntity = this.database.find(
      (item: { id: string }) => item.id === accountId,
    );
    if (!currentEntity) {
      throw new NotFoundException();
    }

    if (state) {
      this.database[index].state = !this.database[index].state;
    }

    return currentEntity.state;
  }
}
