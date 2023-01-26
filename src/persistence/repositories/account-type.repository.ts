import { Injectable, NotFoundException } from '@nestjs/common';

import { AccountTypeEntity } from '../entities';
import { BaseRepository } from './base';
import { AccountTypeRepositoryInterface } from './interfaces';

@Injectable()
export class AccountTypeRepository
    extends BaseRepository<AccountTypeEntity>
    implements AccountTypeRepositoryInterface {

    register(entity: AccountTypeEntity): AccountTypeEntity {
        this.database.push(entity);
        return this.database.at(-1) ?? entity;
    }

    update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
        throw new Error('Method not implemented.');
    }

    delete(id: string, soft?: boolean | undefined): void {
        const indexCurrentEntity = this.database.findIndex((item) => item.id === id);
          if(indexCurrentEntity === -1) throw new NotFoundException();
          this.database.splice(indexCurrentEntity, 1);
    }

    findAll(): AccountTypeEntity[] {
        return this.database;
    }

    findOneById(id: string): AccountTypeEntity {
        throw new Error('Method not implemented.');
    }

    findByState(state: boolean): AccountTypeEntity[] {
        throw new Error('This method is not implemented');
    }

    findByName(name: string): AccountTypeEntity[] {
        throw new Error('This method is not implemented');
    }
}