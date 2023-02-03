import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';

import { AccountEntity } from '../entities';
import { BaseRepository } from './base';
import { AccountRepositoryInterface } from './interfaces';
import { AccountDto } from '../../../business/dtos';
import { ObservableHandler } from '../../../business/observable/observable-handler';


@Injectable()
export class AccountRepository
    extends BaseRepository<AccountEntity>
    implements AccountRepositoryInterface {
        constructor(private readonly observableHandler: ObservableHandler) {
            super();
        }

    register(entity: AccountEntity): AccountEntity {
        this.database.push(entity);
        return this.database.at(-1) ?? entity;
    }

    update(id: string, entity: AccountEntity): AccountEntity {
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

    delete(id: string, soft?: boolean): string {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === id && typeof item.deletedAt === 'undefined'
        );
        if(indexCurrentEntity === -1) throw new NotFoundException();

        if(this.database[indexCurrentEntity].balance > 0) {
            throw new ForbiddenException('The account has balance, it cannot be deleted.');
        }

        if(soft) {
            return this.softDelete(indexCurrentEntity);
        }
        return this.hardDelete(indexCurrentEntity);
    }

    private hardDelete(index: number): string {
        try {
            this.database.splice(index, 1);
        } catch (error) {
            return 'The account could not be deleted';
        }
        return 'The account was successfully deleted';
    }

    private softDelete(index: number): string {
        this.database[index].deletedAt = new Date();

        if(this.database[index].deletedAt) return 'The account was successfully soft deleted'
        return 'The account could not be soft deleted';
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