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
        throw new Error('This method is not implemented');
    }

    delete(id: string, soft?: boolean): void {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === id && typeof item.deletedAt === 'undefined',
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
        throw new Error('This method is not implemented');
    }

    findByCustomer(customerId: string): AccountEntity[] {
        throw new Error('This method is not implemented');
    }

    findByAccountType(accountTypeId: string): AccountEntity[] {
        throw new Error('This method is not implemented');
    }
}