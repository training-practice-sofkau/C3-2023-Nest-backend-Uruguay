import { Injectable, NotFoundException } from '@nestjs/common';

import { GeneralCRUD } from './base';
import { AccountTypeEntity } from '../entities';
import { IAccountTypeRepository, IDisableable } from './interfaces';
import { PaginatorModel } from '../../models';

@Injectable()
export class AccountTypeRepository extends GeneralCRUD<AccountTypeEntity> implements IAccountTypeRepository, IDisableable<AccountTypeEntity> {

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
    let finded = this.database.findIndex(
      (item) => 
        item.id === id
    );
    if (finded === undefined) throw new NotFoundException();
    this.database.splice(finded, 1);
  }

  findAll(paginator: PaginatorModel): AccountTypeEntity[] {
    let finded = this.database
    if (finded === undefined) throw new NotFoundException();
    return finded;
  }

  findOneById(id: string): AccountTypeEntity {
    let finded = this.database.find( (item) => item.id === id );
    if (finded === undefined) throw new NotFoundException();
    return finded;
  }

  findByState(state: boolean): AccountTypeEntity[] {
    let finded = this.database.filter( (item) => item.state === state );
    if (finded === undefined) throw new NotFoundException();
    return finded;
  }

  findByName(name: string): AccountTypeEntity {
    let finded = this.database.find( (item) => item.name === name );
    if (finded === undefined) throw new NotFoundException();
    return finded;
  }
}