import { AccountTypeEntity } from '../entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BASE } from './base';
import { AccountTypeRepositoryInterface } from './interfaces';

@Injectable()
export class AccountTypeRepository
  extends BASE<AccountTypeEntity>
  implements AccountTypeRepositoryInterface
{
  register(entity: AccountTypeEntity): AccountTypeEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === entity.id,
    );
    if (indexCurrentEntity != -1) throw new Error('The Account Type already exists');

    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id
    );
    if (indexCurrentEntity === -1) throw new NotFoundException();

    this.database[indexCurrentEntity] = {
      ...this.database[indexCurrentEntity],
      ...entity,
      id,
    } as AccountTypeEntity;

    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean | undefined): void {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id
    );

    if (indexCurrentEntity == -1) throw new NotFoundException();

    this.hardDelete(indexCurrentEntity);
  }

  private hardDelete(index: number): void {
    this.database.splice(index);
  }

  findAll(): AccountTypeEntity[] {
    return this.database.map(item => item);
  }

  findOneById(id: string): AccountTypeEntity {
    const currentEntity = this.database.find(
      (item) => item.id === id
    );
    if (!currentEntity) throw new NotFoundException();

    return currentEntity;
  }

  findByState(state: boolean): AccountTypeEntity[] {
    return this.database.filter(
      (item) => item.state === state
    );
  }

  findByName(name: string): AccountTypeEntity[] {
    return this.database.filter(
      (item) =>
        item.name === name
    );
  }
}
