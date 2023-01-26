import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { Base } from './base/base.abstract';
import { CRUD } from './interfaces/crud.interface';
import { AccountEntity } from '../entities/account.entity';


@Injectable()
export class AccountRepository  extends Base<AccountEntity> implements CRUD<AccountEntity>{
  
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
    throw new Error('This method is not implemented');
}

private hardDelete(index: number): void {
    throw new Error('This method is not implemented');
}

private softDelete(index: number): void {
    throw new Error('This method is not implemented');
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
    (item) => item.acount_type_id.id ===accountTypeId  && typeof item.deleted_at === 'undefined',
  );
  if (currentEntity) return currentEntity;
  else throw new Error('Datos de no encontrados');
}
  
}