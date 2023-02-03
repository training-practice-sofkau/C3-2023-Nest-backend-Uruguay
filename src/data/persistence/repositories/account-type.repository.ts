import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { AccountTypeEntity } from '../entities';
import { BaseRepository } from './base';
import { AccountTypeRepositoryInterface } from './interfaces';

@Injectable()
export class AccountTypeRepository
    extends BaseRepository<AccountTypeEntity>
    implements AccountTypeRepositoryInterface {

    register(entity: AccountTypeEntity): AccountTypeEntity {
        const nameExisting = this.database.findIndex(accountType => accountType.name === entity.name);

        if(nameExisting != -1) throw new ForbiddenException();

        this.database.push(entity);
        return this.database.at(-1) ?? entity;
    }

    update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
        const indexCurrentEntity = this.database.findIndex((item) => item.id === id);
        if (indexCurrentEntity === -1) throw new NotFoundException();
        return this.database[indexCurrentEntity] = {
            ...this.database[indexCurrentEntity],
            ...entity,
            id,
          } as AccountTypeEntity;
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
        const currentEntity = this.database.find((item) => item.id === id);
        if (currentEntity) return currentEntity;
        else throw new NotFoundException();
    }

    findByState(state: boolean): AccountTypeEntity[] {
        const currentEntities = this.database.filter((item) => item.state === state);
        if (currentEntities) return currentEntities;
        else throw new NotFoundException();
    }

    findByName(name: string): AccountTypeEntity[] {
        const currentEntities = this.database.filter((item) => item.name === name);
        if (currentEntities) return currentEntities;
        else throw new NotFoundException();
    }
}