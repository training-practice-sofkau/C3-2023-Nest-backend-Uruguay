import { Injectable, NotFoundException } from '@nestjs/common';

import { GeneralCRUD } from './base';
import { AccountTypeEntity } from '../entities';

@Injectable()
export class AccountTypeRepository extends GeneralCRUD<AccountTypeEntity> {

  register(entity: AccountTypeEntity) : AccountTypeEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
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
    else throw new NotFoundException;
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }

  findAll(): AccountTypeEntity[] {
    return this.database;
  }

  findOneById(id: string) : AccountTypeEntity {
    throw new Error('Method not implemented.');
  }

  findByState(state: boolean): AccountTypeEntity[] {
    throw new Error('This method is not implemented');
  }

  findByName(name: string): AccountTypeEntity[] {
    throw new Error('This method is not implemented');
  }
}