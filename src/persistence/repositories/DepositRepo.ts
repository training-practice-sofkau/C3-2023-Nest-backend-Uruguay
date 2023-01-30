import { NotFoundException } from "@nestjs/common";
import { DepositEntity } from "../entities/deposit-entity";
import { IRepository } from "./interface/i-base/i-repository";
import { BaseRepository } from "./repo-base/base-repository";
import { DepositRepositoryInterface } from "./interface/i-deposit-repo";
import { PaginationModel } from "src/models/i-pagination-model";

export class DepositRepository extends BaseRepository<DepositEntity> implements DepositRepositoryInterface {
    
     
    
    register(entity: DepositEntity): DepositEntity {

        this.database.push(entity);

        return this.database.at(-1) ?? entity;
    }



    update(id: string, entity: DepositEntity): DepositEntity {
        
        const indexCurrentEntity = this.database.findIndex((item) => item.id === id && typeof item.deletedAt === 'undefined');
        
        if (indexCurrentEntity >= 0) this.database[indexCurrentEntity] = {...this.database[indexCurrentEntity],...entity,id,} as DepositEntity;
        
        else throw new NotFoundException('Lo siento, nada por aqui =(');

        return this.database[indexCurrentEntity];
    }

    
    private hardDelete(index: number): void {
        this.database.splice(index, 1);
    }

    private softDelete(index: number): void {
        this.database[index].deletedAt = Date.now();
    }

    delete(id: string, soft?: boolean): void {

        const index = this.database.findIndex(item => item.id === id);

        if (!index) throw new NotFoundException('Lo siento, nada por aqui =(');

        if (soft) {
            this.softDelete(index);
        } else {
            this.hardDelete(index);
        }
    }

    

    findAll(): DepositEntity[] {
        return this.database.filter((item) => typeof item.daletedAt === 'undefined');
    }
    
    

    findOneById(id: string): DepositEntity {

        const currentEntity = this.database.find((itemId) => itemId.id === id && typeof itemId.daletedAt === 'undefined');
        
        if (!currentEntity) throw new NotFoundException('Lo siento, nada por aqui =(');

        return currentEntity;
    
    }



    findByAccountId(accountId: string): DepositEntity[] {

        const currentEntity = this.database.filter((itemId) => itemId.accountId.id === accountId && typeof itemId.daletedAt === 'undefined');
        
        if (!currentEntity) throw new NotFoundException('Lo siento, nada por aqui =(');

        return currentEntity;
    }




    
    findByDataRange(dateInit: Date | number, dateEnd: Date | number): DepositEntity[] {

        const currentEntity = this.database.filter((itemDate) => itemDate.dateTime >= dateInit && itemDate.dateTime <= dateEnd && typeof itemDate.daletedAt === 'undefined');
        
        if (!currentEntity) throw new NotFoundException('Lo siento, nada por aqui =(');
        
        return currentEntity;
    }



    //**********************NUEVOS************************* */
    
    findBy(property: keyof DepositEntity, value: string | number | boolean, pagination?: PaginationModel | undefined): DepositEntity[] {
        throw new Error("Method not implemented.");
    }
    findIndexById(id: string): number {
        throw new Error("Method not implemented.");
    }
    

    
}