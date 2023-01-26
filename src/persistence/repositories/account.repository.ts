import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../entities/account.entity';
import { Repository } from './base/repository.base';
import { IRepository } from './interfaces/repository.interface';

@Injectable()
export class AccountRepository extends Repository<AccountEntity> implements IRepository<AccountEntity>{
    register(entity: AccountEntity): AccountEntity {
        throw new Error('Method not implemented.');
    }
    update(id: string, entity: AccountEntity): AccountEntity {
        throw new Error('Method not implemented.');
    }
    delete(id: string, soft?: boolean | undefined): void {
        throw new Error('Method not implemented.');
    }
    findAll(): AccountEntity[] {
        throw new Error('Method not implemented.');
    }
    findOneById(id: string): AccountEntity {
        throw new Error('Method not implemented.');
    }
}