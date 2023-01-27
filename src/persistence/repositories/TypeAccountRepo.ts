
import { Injectable, NotFoundException } from "@nestjs/common";
import { AccountTypeEntity } from "../entities/account-type-entity";
import { BaseRepository } from "./repo-base/base-repository";
import { AccountTypeRepositoryInterface } from "./interface/i-account-type-repo";


@Injectable()
export class AccountTypeRepository extends BaseRepository<AccountTypeEntity> implements AccountTypeRepositoryInterface  {


    register(entity: AccountTypeEntity): AccountTypeEntity {

      this.database.push(entity);

      return this.database.at(-1) ?? entity;
    }



    update(id: string, entity: AccountTypeEntity): AccountTypeEntity {

      const indexCurrentEntity = this.database.findIndex((item) => item.id === id);

        if (indexCurrentEntity >= 0)this.database[indexCurrentEntity] = {...this.database[indexCurrentEntity],...entity,id,} as AccountTypeEntity;
        
        else throw new NotFoundException('Lo siento, nada por aqui =(');

        return this.database[indexCurrentEntity];
    }



    delete(id: string, soft?: boolean | undefined): void {

        const index = this.database.findIndex(itemDel => itemDel.id === id);

        if(!index ) throw new NotFoundException('Lo siento, nada por aqui =(');

        this.database.splice(index, 1);
    }


    findAll(): AccountTypeEntity[] {
      
        return this.database;
    }


    findOneById(id: string): AccountTypeEntity {

        const currentEntity = this.database.find((itemId) => itemId.id === id);

        if(!currentEntity ) throw new NotFoundException('Lo siento, nada por aqui =(');

        return currentEntity;
    }


    findByState(state: boolean): AccountTypeEntity[] {

        return this.database.filter((itemState) => itemState.state === state);
    }



    findByName(name: string): AccountTypeEntity[] {

        const currentEntity = this.database.filter((itemName) => itemName.name === name);
        
        if(!currentEntity ) throw new NotFoundException('Lo siento, nada por aqui =(');

        return currentEntity;
    }


}
