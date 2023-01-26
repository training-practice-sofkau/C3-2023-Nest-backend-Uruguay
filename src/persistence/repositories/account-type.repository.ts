import { Injectable } from '@nestjs/common';
import { AccountTypeEntity } from '../entities';

import { BaseRepository } from './base';
import { AccountTypeRepositoryInterface } from './interfaces';

@Injectable()
export class AccountTypeRepository
    extends BaseRepository<AccountTypeEntity>
    implements AccountTypeRepositoryInterface {
    register(entity: AccountTypeEntity): AccountTypeEntity {
        throw new Error('Method not implemented.');
    }
    update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
        throw new Error('Method not implemented.');
    }
    delete(id: string, soft?: boolean | undefined): void {
        throw new Error('Method not implemented.');
    }
    findAll(): AccountTypeEntity[] {
        throw new Error('Method not implemented.');
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