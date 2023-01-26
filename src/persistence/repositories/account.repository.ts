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
        this.database[indexCurrentEntity].deletedAt = Date.now() :
        this.database.splice(indexCurrentEntity, 1);
    }

    private hardDelete(index: number): void {
        throw new Error('This method is not implemented');
    }

    private softDelete(index: number): void {
        throw new Error('This method is not implemented');
    }

    findAll(): AccountEntity[] {
        throw new Error('This method is not implemented');
    }

    findOneById(id: string): AccountEntity {
        throw new Error('This method is not implemented');
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