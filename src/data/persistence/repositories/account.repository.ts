import { Injectable, NotFoundException } from '@nestjs/common';

import { Base } from '../../base/base.abstract';
import { CRUD } from '../interfaces/crud.interface';
import { AccountEntity } from '../entities/account.entity';


@Injectable()
export class AccountRepository extends Base<AccountEntity> implements CRUD<AccountEntity>{

  register(entity: AccountEntity): AccountEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: AccountEntity): AccountEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id && typeof item.deleted_at === 'undefined',
    );
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as AccountEntity;
    else throw new AccountEntity();
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean): void {
    const index = this.database.findIndex(
      (item) => item.id === id
    );
    if (index == -1){
    throw new Error('No se encontraron elementos');
    }
if (soft){
    this.hardDelete(index)
  }else{
    this.softDelete(index)
  }

  }

  private hardDelete(index: number): void {
    this.database.splice(index, 1);
  }

  private softDelete(index: number): void {
    this.database[index].deleted_at = Date.now()

  }

  findAll(): AccountEntity[] {

    if (this.database.length == 0) {
      throw new Error('No se encontraron elementos');
    }
    return this.database.filter(
      (item) => typeof item.deleted_at === 'undefined',
    );
  }

  findOneById(id: string): AccountEntity {
    const currentEntity = this.database.find(
      (item) => item.id === id && typeof item.deleted_at === 'undefined',
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException("Elemento no encontrado");
  }

  findByState(state: boolean): AccountEntity[] {
    const currentEntity: AccountEntity[] = this.database.filter(
      (item) => item.state === state && typeof item.deleted_at === 'undefined',
    );
    if (currentEntity) return currentEntity;
    else throw new Error('Datos de no encontrados');
  }

  findByCustomer(customerId: string): AccountEntity[] {
    const currentEntity: AccountEntity[] = this.database.filter(
      (item) => item.customer_id.id === customerId && typeof item.deleted_at === 'undefined',
    );
    if (currentEntity) return currentEntity;
    else throw new Error('Datos de no encontrados');
  }


  findByAccountType(accountTypeId: string): AccountEntity[] {
    const currentEntity: AccountEntity[] = this.database.filter(
      (item) => item.account_type_id.id === accountTypeId && typeof item.deleted_at === 'undefined',
    );
    if (currentEntity) return currentEntity;
    else throw new Error('Datos de no encontrados');
  }

 

}