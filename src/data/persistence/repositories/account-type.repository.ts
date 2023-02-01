import { Injectable, NotFoundException } from '@nestjs/common';
import { Base } from '../../base/base.abstract';
import { CRUD } from '../interfaces/crud.interface';
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
      } as AccountTypeEntity;
    else throw new Error('No se encontraron elementos');
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean | undefined): void {
    const index = this.database.findIndex(
      (item) => item.id === id
    );
    if (index == -1){
    throw new Error('No se encontraron elementos');;
    }

    this.database.splice(index, 1);
  }

  findAll(): AccountTypeEntity[] {

    if (this.database.length == 0) {
      throw new Error('No se encontraron elementos');
    }
    return this.database
  }

  findOneById(id: string): AccountTypeEntity {
    const currentEntity = this.database.find(
      (item) => item.id === id
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException("Elemento no encontrado");
  }

  findByState(state: boolean): AccountTypeEntity[] {
    const currentEntity: AccountTypeEntity[] = this.database.filter(
      (item) => item.state === state
    );
    if (currentEntity) return currentEntity;
    else throw new Error('Datos no encontrados');
  }

  findByName(name: string): AccountTypeEntity[] {
    const currentEntity: AccountTypeEntity[] = this.database.filter(
      (item) => item.name === name
    );
    if (currentEntity) return currentEntity;
    else throw new Error('Datos de no encontrados');
  }


}