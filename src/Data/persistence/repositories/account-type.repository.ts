import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountTypeEntity } from '../entities';

import { BaseRepository } from './base';
import { AccountTypeRepositoryInterface } from './interfaces';

@Injectable()
export class AccountTypeRepository
  extends BaseRepository<AccountTypeEntity>
  implements AccountTypeRepositoryInterface
{
  searchByAttributesforOne(
    attributes: keyof AccountTypeEntity,
    dataToSearch: string,
  ): AccountTypeEntity {
    const currentEntity = this.database.find(
      (entity) => entity[attributes] === dataToSearch,
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException();
  }

  searchByAttributes(
    attributes: keyof AccountTypeEntity,
    dataToSearch: string,
  ): AccountTypeEntity[] {
    const currentEntity = this.database.filter(
      (entity) => entity[attributes] === dataToSearch,
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException();
  }

  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id,
    );
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as AccountTypeEntity;
    else throw new NotFoundException();
    return this.database[indexCurrentEntity];
  }
  delete(id: string, soft?: boolean | undefined): void {
    this.database.splice(
      this.database.findIndex((item) => item.id === id),
      1,
    );
  }
  findAll(): AccountTypeEntity[] {
    return this.database;
  }
  findByState(state: boolean): AccountTypeEntity[] {
    return this.database.filter((item) =>
      state === true ? item.state === true : item.state === false,
    );
  }
}
