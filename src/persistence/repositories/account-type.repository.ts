import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { AccountTypeEntity } from "../entities/account-type.entity";
import { BankInternalControl } from "./base";
import { RepositoryMethodsInterface } from "./interfaces";

@Injectable()
export class AccountTypeRepository extends BankInternalControl<AccountTypeEntity> implements RepositoryMethodsInterface<AccountTypeEntity>{

    /**
     * Adds a new entity to the Array
     * @param entity new object to be inserted in the array
     * @returns new entity added
     */
    register(entity: AccountTypeEntity): AccountTypeEntity {
        
        try{ // try to add the entity to the array
            
            const res = this.database.push(entity);
            
            if(res < 0 ){ //push didn't return new array lenght (something wrong happened)
                throw new Error("Error creating new customer!");                
            }
            
            return entity; // all good, the new entity was created

        } catch (err){ // something went wrong, push didn't work

            throw new InternalServerErrorException(`Internal Error! (${err})`)

        }

    }

    update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
        throw new Error("Method not implemented.");
    }

    delete(id: string, soft?: boolean | undefined): void {
        throw new Error("Method not implemented.");
    }

    findAll(): AccountTypeEntity[] {

        return this.database;

    }

    findOneById(id: string): AccountTypeEntity {
        throw new Error("Method not implemented.");
    }
    
}