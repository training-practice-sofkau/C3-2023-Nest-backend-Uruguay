import { Injectable } from "@nestjs/common/decorators";
import { AccountEntity } from '../entities';
import { BankInternalControl } from "./base";
import { RepositoryMethodsInterface } from "./interfaces";


@Injectable()
export class AccountRepository extends BankInternalControl <AccountEntity> implements RepositoryMethodsInterface<AccountEntity>  {

    register(entity: AccountEntity): AccountEntity {
        throw new Error("Method not implemented.");
    }

    update(id: string, entity: AccountEntity): AccountEntity {
        throw new Error("Method not implemented.");
    }

    delete(id: string, soft?: boolean | undefined): void {
        throw new Error("Method not implemented.");
    }

    findAll(): AccountEntity[] {
        throw new Error("Method not implemented.");
    }

    findOneById(id: string): AccountEntity {
        throw new Error("Method not implemented.");
    }    
    
    
}