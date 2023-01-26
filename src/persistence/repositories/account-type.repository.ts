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
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === id,
        );
        if (indexCurrentEntity >= 0)
            this.database[indexCurrentEntity] = {
            ...this.database[indexCurrentEntity],
            ...entity,
            id,
            } as AccountTypeEntity;
        else throw new NotFoundException();
        return this.database[indexCurrentEntity];
    }

    delete(id: string, soft?: boolean | undefined): void {
        throw new Error('Method not implemented.');
    }

    findAll(): AccountTypeEntity[] {
        return this.database;
    }

    findOneById(id: string): AccountTypeEntity {
        const currentEntity = this.database.find(
            (item) => item.id === id,
        );
        if (currentEntity) return currentEntity;
        else throw new NotFoundException();
    }

    findByState(state: boolean): AccountTypeEntity[] {
        return this.database.filter(
            (item) => item.state === state,
        );
    }

    findByName(name: string): AccountTypeEntity[] {
        const currentEntity = this.database.filter(
            (item) => item.name === name,
        );
        if (currentEntity) return currentEntity;
        else throw new NotFoundException();
    }
}