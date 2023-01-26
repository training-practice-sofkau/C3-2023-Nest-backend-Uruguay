import { Injectable } from '@nestjs/common';
import { basename } from 'path';
import { DocumentTypeEntity } from '../entities';
import { Base } from './base/base.abstract';
import { CRUD } from './interfaces/crud.interface';
import { AccountEntity } from '../entities/account.entity';
import { AccountTypeEntity } from '../entities/account-type.entity';


@Injectable()
export class AccountTypeRepository extends Base<AccountTypeEntity> implements CRUD<AccountTypeEntity>{


  register(entity: AccountTypeEntity): AccountTypeEntity {
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
      } as DocumentTypeEntity;
    else throw new DocumentTypeEntity();
    return this.database[indexCurrentEntity];
  }
  }

  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }

  findAll(): AccountTypeEntity[] {
    throw new Error('Method not implemented.');
  }

  findOneById(id: string): AccountTypeEntity{
    throw new Error('Method not implemented.');
  }

  findByState(state: boolean): AccountTypeEntity[] {
    throw new Error('This method is not implemented');
  }

  findByName(name: string): AccountTypeEntity[] {
    throw new Error('This method is not implemented');
  }


}