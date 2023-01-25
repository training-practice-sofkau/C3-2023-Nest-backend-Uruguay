import { CRUDRepo } from './interfaces/CRUD.interface';
import { AccountTypeEntity } from '../entities/account_type.entity';
export class AccountTypeRepository implements CRUDRepo {
    
    private readonly database: Array<AccountTypeEntity>;

    constructor() {
        this.database = new Array<AccountTypeEntity>;
    }
    
    register(entity: AccountTypeEntity): AccountTypeEntity {
        throw new Error('Method not implemented.');
    }
    update(entity: AccountTypeEntity): AccountTypeEntity {
        throw new Error('Method not implemented.');
    }
    delete(entity: AccountTypeEntity): void {
        throw new Error('Method not implemented.');
    }
    findAll(): AccountTypeEntity[] {
        throw new Error('Method not implemented.');
    }
    findById(id: string): AccountTypeEntity {
        throw new Error('Method not implemented.');
    }

}
