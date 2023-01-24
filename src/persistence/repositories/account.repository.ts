import { CustomerEntity } from '../entities/customer.entity';
import { CRUDRepo } from './interfaces/CRUD.interface';
import { AccountEntity } from '../entities/account.entity';
export class AccountRepository implements CRUDRepo {
    register(entity: AccountEntity): AccountEntity {
        throw new Error('Method not implemented.');
    }
    update(entity: AccountEntity): AccountEntity {
        throw new Error('Method not implemented.');
    }
    delete(entity: AccountEntity): void {
        throw new Error('Method not implemented.');
    }
    findAll(): AccountEntity[] {
        throw new Error('Method not implemented.');
    }
    findById(id: string): AccountEntity {
        throw new Error('Method not implemented.');
    }

}
