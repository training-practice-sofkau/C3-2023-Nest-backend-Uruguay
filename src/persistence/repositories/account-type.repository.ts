import { Injectable } from '@nestjs/common';

import { GeneralCRUD } from './base';
import { AccountTypeEntity } from '../entities';

@Injectable()
export class AccountTypeRepository extends GeneralCRUD<AccountTypeEntity> {

  register(entity: AccountTypeEntity) : AccountTypeEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: AccountTypeEntity) : AccountTypeEntity{
    throw new Error('Method not implemented.');
  }

  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }

  findAll(): AccountTypeEntity[] {
    throw new Error('Method not implemented.');
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