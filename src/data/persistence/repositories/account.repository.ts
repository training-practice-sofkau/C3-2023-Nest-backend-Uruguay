import { Injectable, NotFoundException } from '@nestjs/common';

import { GeneralCRUD } from './base';
import { AccountEntity } from '../entities';
import { IAccountRepository, IDisableable, INameable } from './interfaces';
import { PaginationModel } from '../../models';

@Injectable()
export class AccountRepository extends GeneralCRUD<AccountEntity> implements IAccountRepository, IDisableable<AccountEntity>, INameable<AccountEntity> {

  register(entity: AccountEntity): AccountEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: AccountEntity): AccountEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id == id && 
      item.deletedAt == undefined
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
    let finded = this.database.findIndex(
        (item) => 
          item.id == id
    );
    if (finded == undefined) throw new NotFoundException();
    soft ? this.softDelete(finded) : this.hardDelete(finded);
  }

  private hardDelete(index: number): void {
    this.database.splice(index, 1);
    // This will be work but the main Repository instance its not exist
    // MainAccountTypeRepository().delete(this.database[index].accountType.id, false);
    // And optional deposits remove sentence
    // MainDepositRepository().findByAccountId(this.database[index].id).forEach(function (value) {
    //     MainDepositRepository().delete(value.id, false);
    // });
  }

  private softDelete(index: number): void {
    this.database[index].deletedAt = Date.now();
    // This will be work but the main Repository instance its not exist
    // MainAccountTypeRepository().delete(this.database[index].accountType.id, true);
    // And optional deposits remove sentence
    // MainDepositRepository().findByAccountId(this.database[index].id).forEach(function (value) {
    //     MainDepositRepository().delete(value.id, true);
    // });
  }

  findAll(paginator: PaginationModel): AccountEntity[] {
    let finded = this.database.filter(
        (item) => item.deletedAt == undefined
    );
    if (finded == undefined) throw new NotFoundException();
    return finded.slice(paginator?.offset, paginator?.limit);
  }

  findOneById(id: string): AccountEntity {
    let finded = this.database.find(
        (item) => 
          item.id == id &&
          item.deletedAt == undefined
    );
    if (finded == undefined) throw new NotFoundException();
    return finded;
  }

  findByState(state: boolean): AccountEntity[] {
    let finded = this.database.filter(
        (item) => 
          item.state == state &&
          item.deletedAt == undefined
    );
    if (finded == undefined) throw new NotFoundException();
    return finded;
  }

  findByCustomer(customerId: string): AccountEntity[] {
    let finded = this.database.filter(
        (item) => 
          item.customer.id == customerId &&
          item.deletedAt == undefined &&
          item.customer.deletedAt == undefined
    );
    console.log(finded);
    if (finded == undefined) throw new NotFoundException();
    return finded;
  }

  findByAccountType(accountTypeId: string): AccountEntity {
    let finded = this.database.find(
        (item) => 
          item.accountType.id == accountTypeId &&
          item.deletedAt == undefined
    );
    if (finded == undefined) throw new NotFoundException();
    return finded;
  }

  findByName(name: string): AccountEntity[] {
    let finded = this.database.filter(
        (item) => 
          item.customer.fullName == name &&
          item.deletedAt == undefined
    );
    if (finded == undefined) throw new NotFoundException();
    return finded;
  }
}