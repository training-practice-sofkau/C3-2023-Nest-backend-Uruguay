import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountEntity } from '../entities/account.entity';
import { depositEntity } from '../entities/deposit.entity';

import { BaseRepository } from './base';
import { DepositRepositoryInterface } from './interfaces/';

@Injectable()
export class DepositRepository
    extends BaseRepository<depositEntity> implements DepositRepositoryInterface {
   
        register(entity: depositEntity): depositEntity {
            this.database.push(entity);
            return this.database.at(-1) ?? entity;
          }
    update(id: string, entity: depositEntity): depositEntity {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === id && typeof item.deletedAt === 'undefined',
          );
          if (indexCurrentEntity >= 0)
            this.database[indexCurrentEntity] = {
              ...this.database[indexCurrentEntity],
              ...entity,
              id,
            } as depositEntity;
          else throw new NotFoundException();
          return this.database[indexCurrentEntity];
    }
    delete(id: string, soft?: boolean): void {
        const customer = this.findOneById(id);
        if (soft || soft === undefined) {
          customer.deletedAt = Date.now();
          this.update(id, customer);
        } else {
          const index = this.database.findIndex(
            (item) => item.id === id && (item.deletedAt ?? true) === true,
          );
          this.database.splice(index, 1);
        }
      }
      findAll(): depositEntity[] {
        return this.database.filter((item) => item.deletedAt === undefined);
      }

      findOneById(id: string): depositEntity {
    const deposit = this.database.find(
      (item) => item.id === id && (item.deletedAt ?? true) === true);
    if (deposit) return deposit;
    else throw new NotFoundException("El id no existe en base de datos");
      }

    findByAccountType(accountTypeId: string): AccountEntity[] {
        throw new Error('This method is not implemented');
    }
    findByCustomer(customerId: string): AccountEntity[] {
        throw new Error('This method is not implemented');
    }
    findByState(state: boolean): AccountEntity[] {
        throw new Error('This method is not implemented');
    }
    private softDelete(index: number): void {
        throw new Error('This method is not implemented');
    }
    private hardDelete(index: number): void {
        throw new Error('This method is not implemented');
    }

}