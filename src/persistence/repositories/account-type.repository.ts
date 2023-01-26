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
    const indexCurrentEntity = this.findIndex(entity.id)
    if (indexCurrentEntity != -1) throw new Error('The Account Type already exists');

    this.database.push(entity);
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

  private findIndex(id: string): number {
    return this.database.findIndex(
      (item) => item.id === id
    );
  }
}
