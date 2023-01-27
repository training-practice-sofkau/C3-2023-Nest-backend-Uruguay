import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountEntity } from '../entities/account.entity';
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

    updateBalance(id: string, balance: number): void {
        this.findOneById(id).balance += balance
    }

    delete(id: string, soft?: boolean): void {
        const indexToDelete = this.database.findIndex(
            i => i.id === id &&
                typeof i.deletedAt === 'undefined'
        )
        soft ? this.hardDelete(indexToDelete) : this.softDelete(indexToDelete)
    }

    private hardDelete(index: number): void {
        if (index > -1) {
            this.database.splice(index, 1)
        }
    }

    private softDelete(index: number): void {
        if (index > -1) {
            this.database.find(index => index.deletedAt = new Date)
        }
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
        if (!currentEntity) throw new NotFoundException()
        else return currentEntity
    }

    findByState(state: boolean): AccountEntity[] {
        const currentEntity = this.database.filter(
            (item) => item.state === state && typeof item.deletedAt === 'undefined',
        )
        if (!currentEntity) throw new NotFoundException()
        else return currentEntity
    }

    findByCustomer(customerId: string): AccountEntity[] {
        const currentEntity = this.database.filter(
            (item) => item.customer.id === customerId && typeof item.deletedAt === 'undefined',
        )
        if (!currentEntity) throw new NotFoundException()
        else return currentEntity
    }

    findByAccountType(accountTypeId: string): AccountEntity[] {
        const currentEntity = this.database.filter(
            (item) => item.accountType.id === accountTypeId && typeof item.deletedAt === 'undefined',
        )
        if (!currentEntity) throw new NotFoundException()
        else return currentEntity
    }
}