import { Injectable } from "@nestjs/common/decorators";
import { AccountEntity } from '../entities';
import { RepositoryMethodsInterface } from "./interfaces";

@Injectable()
export class AccountRepository implements RepositoryMethodsInterface<AccountEntity> {
    private readonly database: Array<AccountEntity>;

    constructor(){
        this.database = new Array<AccountEntity>();
    }
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