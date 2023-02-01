import { Injectable, NotFoundException } from '@nestjs/common';

import { AccountEntity } from '../entities';
import { BaseRepository } from './base';
import { AccountRepositoryInterface } from './interfaces';
import { AccountDto } from '../../../business/dtos';


@Injectable()
export class AccountRepository
    extends BaseRepository<AccountEntity>
    implements AccountRepositoryInterface {

    register(entity: AccountEntity): AccountEntity {
        this.database.push(entity);
        return this.database.at(-1) ?? entity;
    }

    update(id: string, entity: AccountDto): AccountEntity {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === id && typeof item.deletedAt === 'undefined'
        );
        if (indexCurrentEntity === -1) throw new NotFoundException();
        return this.database[indexCurrentEntity] = {
            ...this.database[indexCurrentEntity],
            ...entity,
            id,
          } as AccountEntity;
      }

    delete(id: string, soft?: boolean): void {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === id && typeof item.deletedAt === 'undefined'
        );
        if(indexCurrentEntity === -1) throw new NotFoundException();
        soft ?
        this.softDelete(indexCurrentEntity) :
        this.hardDelete(indexCurrentEntity);
    }

    private hardDelete(index: number): void {
        this.database.splice(index, 1);
    }

    private softDelete(index: number): void {
        this.database[index].deletedAt = Date.now();
    }

    findAll(): AccountEntity[] {
        return this.database.filter(
            (item) => typeof item.deletedAt === 'undefined',
          );
    }

    findOneById(id: string): AccountEntity {
        const currentEntity = this.database.find(
            (item) => item.id === id && typeof item.deletedAt === 'undefined',
        );
        if (currentEntity) return currentEntity;
        else throw new NotFoundException();
    }

    findByState(state: boolean): AccountEntity[] {
        const currentEntities = this.database.filter(
            (item) => item.state === state && typeof item.deletedAt === 'undefined');
        if (currentEntities) return currentEntities;
        else throw new NotFoundException();
    }

    findByCustomer(customerId: string): AccountEntity[] {
        const currentEntities = this.database.filter(
            (item) => item.id === customerId && typeof item.deletedAt === 'undefined');
        if (currentEntities) return currentEntities;
        else throw new NotFoundException();
    }

    findByAccountType(accountTypeId: string): AccountEntity[] {
        const currentEntities = this.database.filter(
            (item) => item.id === accountTypeId && typeof item.deletedAt === 'undefined');
        if (currentEntities) return currentEntities;
        else throw new NotFoundException();
    }
}