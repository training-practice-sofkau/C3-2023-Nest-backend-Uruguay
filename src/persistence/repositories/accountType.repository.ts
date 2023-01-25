import { AccountTypeEntity } from '../entities';
import { BaseRepositories } from '../';

export class AccountTypeRepository implements BaseRepositories<AccountTypeEntity> {
    findAll(): AccountTypeEntity[] {
        throw new Error('Method not implemented.');
    }
    findOneById(id: string): AccountTypeEntity {
        throw new Error('Method not implemented.');
    }
    register(entity: AccountTypeEntity): AccountTypeEntity {
        throw new Error('Method not implemented.');
    }
    update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
        throw new Error('Method not implemented.');
    }
    delete(id: string): void {
        throw new Error('Method not implemented.');
    }
}
