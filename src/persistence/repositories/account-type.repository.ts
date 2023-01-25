import { Injectable } from "@nestjs/common";
import { AccountTypeEntity } from "../entities/account-type.entity";
import { BankInternalControl } from "./base";
import { RepositoryMethodsInterface } from "./interfaces";

@Injectable()
export class AccountTypeRepository extends BankInternalControl<AccountTypeEntity> implements RepositoryMethodsInterface<AccountTypeEntity>{

    register(entity: AccountTypeEntity): AccountTypeEntity {
        throw new Error("Method not implemented.");
    }

    update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
        throw new Error("Method not implemented.");
    }

    delete(id: string, soft?: boolean | undefined): void {
        throw new Error("Method not implemented.");
    }

    findAll(): AccountTypeEntity[] {
        throw new Error("Method not implemented.");
    }

    findOneById(id: string): AccountTypeEntity {
        throw new Error("Method not implemented.");
    }
    
}