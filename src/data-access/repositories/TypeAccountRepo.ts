
import { Injectable, NotFoundException } from "@nestjs/common";
import { AccountTypeEntity } from "../entities/account-type-entity";
import { BaseRepository } from "../interface-repo/repo-base/base-repository";
import { AccountTypeRepositoryInterface } from "../interface-repo/i-account-type-repo";
import { IRepository } from "../interface-repo/i-base/i-repository";
import { PaginationModel } from "src/data-access/models/i-pagination-model";


@Injectable()
export class AccountTypeRepository extends BaseRepository<AccountTypeEntity> implements AccountTypeRepositoryInterface  {
  


    register(entity: AccountTypeEntity): AccountTypeEntity {

      this.database.push(entity);

      return this.database.at(-1) ?? entity;
    }



    update(id: string, entity: AccountTypeEntity): AccountTypeEntity {

      const indexCurrentEntity = this.database.findIndex((obj) => obj.id === id);

        if (indexCurrentEntity >= 0)this.database[indexCurrentEntity] = {...this.database[indexCurrentEntity],...entity,id,} as AccountTypeEntity;
        
        else throw new NotFoundException('Lo siento, nada por aqui =(');

        return this.database[indexCurrentEntity];
    }



    delete(id: string, soft?: boolean | undefined): void {

        const index = this.database.findIndex(objDel => objDel.id === id);

        if(!index ) throw new NotFoundException('Lo siento, nada por aqui =(');

        this.database.splice(index, 1);
    }


    findAll(): AccountTypeEntity[] {
      
        return this.database;
    }


    findOneById(id: string): AccountTypeEntity {

        const currentEntity = this.database.find((objId) => objId.id === id);

        if(!currentEntity ) throw new NotFoundException('Lo siento, nada por aqui =(');

        return currentEntity;
    }


    findByState(state: boolean): AccountTypeEntity[] {

        return this.database.filter((objState) => objState.state === state);
    }



    findByName(name: string): AccountTypeEntity[] {

        const currentEntity = this.database.filter((objName) => objName.name === name);
        
        if(!currentEntity ) throw new NotFoundException('Lo siento, nada por aqui =(');

        return currentEntity;
    }

    //*************NUEVOS********************/

      
    findBy(property: keyof AccountTypeEntity, value: string | number | boolean, pagination?: PaginationModel | undefined): AccountTypeEntity[] {
        throw new Error("Method not implemented.");
    }
    findIndexById(id: string): number {
        throw new Error("Method not implemented.");
    }


}
