import { Injectable } from "@nestjs/common/decorators";


import { AccountEntity } from '../entities';
import { BankInternalControl } from "./base";
import { AccountRepositoryInterface } from './interfaces';


@Injectable()
export class AccountRepository extends BankInternalControl <AccountEntity> implements AccountRepositoryInterface  {

    register(entity: AccountEntity): AccountEntity {
        
        return entity;
        
    }

    update(id: string, entity: AccountEntity): AccountEntity {
        throw new Error("Method not implemented.");
    }

    delete(id: string, soft?: boolean | undefined): void {
        throw new Error("Method not implemented.");
    }

    private hardDelete(index: number): void {
        throw new Error('This method is not implemented');
    }

    private softDelete(index: number): void {
        throw new Error('This method is not implemented');
    }


    findAll(): AccountEntity[] {
        
        return this.database;
        
    }

    findOneById(id: string): AccountEntity {
        throw new Error("Method not implemented.");
    }    
    
    findByState(state: boolean): AccountEntity[] {
        throw new Error('This method is not implemented');
    }

    findByCustomer(customerId: string): AccountEntity[] {
        throw new Error('This method is not implemented');
    }

    findByAccountType(accountTypeId: string): AccountEntity[] {
        throw new Error('This method is not implemented');
    }
}