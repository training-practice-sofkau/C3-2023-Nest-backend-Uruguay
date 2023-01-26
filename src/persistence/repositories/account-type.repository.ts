import { Injectable } from '@nestjs/common';

import { BaseRepository } from './';
import { AccountTypeRepositoryInterface } from './interfaces';
import { accountTypeModel } from '../entities/account.type.entities';

@Injectable()
export class AccountTypeRepository
    extends BaseRepository<accountTypeModel>
    implements AccountTypeRepositoryInterface {

    register(entity: accountTypeModel): void {
        throw new Error('Method not implemented.');
    }

    update(id: string, entity: accountTypeModel) {
        throw new Error('Method not implemented.');
    }

    delete(id: string, soft?: boolean | undefined): void {
        throw new Error('Method not implemented.');
    }

    findAll(): accountTypeModel[] {
        throw new Error('Method not implemented.');
    }

    findOneById(id: string) {
        throw new Error('Method not implemented.');
    }

    findByState(state: boolean): accountTypeModel[] {
        throw new Error('This method is not implemented');
    }

    findByName(name: string): accountTypeModel[] {
        throw new Error('This method is not implemented');
    }
}