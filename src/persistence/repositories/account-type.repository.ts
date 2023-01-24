import { Injectable } from "@nestjs/common";
import { AccountTypeEntity } from "../entities";


@Injectable()
export class AccountTypeRepository {
    private readonly database: Array<AccountTypeEntity>

    constructor() {
        this.database = new Array<AccountTypeEntity>();
    }
    
    register(entity: AccountTypeEntity): AccountTypeEntity{
        throw new Error('This method is not implemented');
    }
    
    update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
        throw new Error('This method is not implemented');
    }
    
    delete(id: string, soft?: boolean): void {
        throw new Error('This method is not implemented');
    }
    
    findAll(): AccountTypeEntity[] {
        throw new Error('This method is not implemented');
    }
    
    findOneById(id: string): AccountTypeEntity {
        throw new Error('This method is not implemented');
    }
}