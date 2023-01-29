import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountTypeEntity } from '../entities/account-type.entity';

import { BaseRepository } from './base';
import { AccountTypeRepositoryInterface } from './interfaces';

@Injectable()
export class AccountTypeRepository
  extends BaseRepository<AccountTypeEntity>
  implements AccountTypeRepositoryInterface
{
  register(entity: AccountTypeEntity): AccountTypeEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id));

    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as AccountTypeEntity;
    //Si lo que viene del if puede entrar a CustomerEntity? 2do check
    else throw new NotFoundException();
    return this.database[indexCurrentEntity];
  }

  
    delete(id: string, soft?: boolean): void {
        const customer = this.findOneById(id);
        if (soft || soft === undefined) {
       
          this.update(id, customer);
        } else {
          const index = this.database.findIndex(
            (item) => item.id === id);
          this.database.splice(index, 1);
        }
      }

      findAll(): AccountTypeEntity[] {
        return this.database;
      }
    
      findOneById(id: string): AccountTypeEntity {
        const account = this.database.find(
          (item) => item.id === id 
        );
        if (account) return account;
        else throw new NotFoundException("El id no existe en base de datos");
      }

   
    findByState(state: boolean): AccountTypeEntity[] {
      const stadof = this.database.filter( //filtra segun una condicion y devuelve un array
      (item) => item.state == state 
    )
    return stadof;
    }

    findByName(name: string): AccountTypeEntity[] {
      const nombrec = this.database.filter( //filtra segun una condicion y devuelve un array
      (item) => item.name == name 
    )
    return nombrec;
  }
    
}