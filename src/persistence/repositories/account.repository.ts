import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountEntity } from '../entities';

import { BaseRepository } from './base';
import { AccountRepositoryInterface } from './interfaces';


@Injectable()
export class AccountRepository
    extends BaseRepository<AccountEntity>
    implements AccountRepositoryInterface {
    register(entity: AccountEntity): AccountEntity {
        this.database.push(entity);
        return this.database.at(-1) ?? entity;
    }

    update(id: string, entity: AccountEntity): AccountEntity {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === id && typeof item.deletedAt === 'undefined',
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
        const index = this.database.findIndex((item) => item.id === id);

        if (soft === true) {

            this.hardDelete(index)
        }
        else{
            this.softDelete(index)
                }
    }

    private hardDelete(index: number): void {        
        this.database.splice(index, 1);
    }

    private softDelete(index: number): void {
        this.database[index].state = false   
        this.database[index].deletedAt = Date.now()
     }

    findAll(): AccountEntity[] {
        return this.database.filter(
            (item) => typeof item.deletedAt === 'undefined',
          );    }

    findOneById(id: string): AccountEntity {
        const currentEntity = this.database.find(
            (item) => item.id === id && typeof item.deletedAt === 'undefined',
          );
          if (currentEntity) return currentEntity;
          else throw new NotFoundException();
    }

    findByState(state: boolean): AccountEntity[] {
        return this.database.filter((item) => ( state === true ? item.state === true : item.state !== true ));    
    }

    findByCustomer(customerId: string): AccountEntity[] {
        const currentEntity = this.database.filter(
            (item) => item.outcome.id === customerId,
          );
          if (currentEntity) 
          return currentEntity;
          else throw new NotFoundException();  }

    findByAccountType(accountTypeId: string): AccountEntity[] {
        const currentEntity = this.database.filter(
            (item) => item.accountTypeId.id === accountTypeId,
          );
          if (currentEntity) 
          return currentEntity;
          else throw new NotFoundException();
    }
}