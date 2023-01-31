import { Injectable, NotFoundException } from "@nestjs/common";
import { TransferEntity } from "../entities/transfer-entity";
import { TransferRepositoryInterface } from "./interface/i-transfer-repo";
import { BaseRepository } from "./repo-base/base-repository";
import { PaginationModel } from "src/models/i-pagination-model";

@Injectable()
export class TransferRepository extends BaseRepository<TransferEntity> implements TransferRepositoryInterface {
   
   
    register(entity: TransferEntity): TransferEntity {

        this.database.push(entity);

        return this.database.at(-1) ?? entity;
    }



    update(id: string, entity: TransferEntity): TransferEntity {

        const indexCurrentEntity = this.database.findIndex((obj) => obj.id === id && typeof obj.deletedAt === 'undefined');
        
        if (indexCurrentEntity >= 0)
            this.database[indexCurrentEntity] = {...this.database[indexCurrentEntity],...entity,id,} as TransferEntity;
        
        else throw new NotFoundException('Lo siento, nada por aquí! =(');

        return this.database[indexCurrentEntity];
    }
    



    private hardDelete(index: number): void {
        this.database.splice(index, 1);
    }

    private softDelete(index: number): void {
        this.database[index].deletedAt = Date.now();
    }

    delete(id: string, soft?: boolean): void {

        const index = this.database.findIndex(obj => obj.id === id);

        if(!index ) throw new NotFoundException('Lo siento, nada por aquí! =(');

        if (soft) {
            this.softDelete(index);
        } else {
            this.hardDelete(index);
        }
    }

   


    findAll(): TransferEntity[] {

        return this.database.filter((item) => typeof item.deletedAt === 'undefined');
    }



    findOneById(id: string): TransferEntity {

        const currentEntity = this.database.find((item) => item.id === id && typeof item.deletedAt === 'undefined'); //si esta indefinido no fue borrado

        if(!currentEntity ) throw new NotFoundException('Lo siento, nada por aquí! =(');

        return currentEntity;
    }

    
    //Encontrar resultado por rango de fechas
    
    findOutcomeByDataRange(accountId: string, dateInit: Date | number, dateEnd: Date | number): TransferEntity[] {
        
        const currentEntity = this.database.filter((item) => item.outcome.id === accountId && item.dateTime >= dateInit && item.dateTime <= dateEnd && typeof item.deletedAt === 'undefined');
        
        if(!currentEntity ) throw new NotFoundException('Lo siento, nada por aquí! =(');

        return currentEntity;
    }




    findIncomeByDataRange(accountId: string, dateInit: Date | number, dateEnd: Date | number): TransferEntity[] {
        
        const currentEntity = this.database.filter((objIRange) => objIRange.income.id === accountId && objIRange.dateTime >= dateInit && objIRange.dateTime <= dateEnd && typeof objIRange.deletedAt === 'undefined');
        
        if(!currentEntity ) throw new NotFoundException('Lo siento, nada por aquí! =(');
        
        return currentEntity;
    }


    //******************NUEVOS**********************/

    findBy(property: keyof TransferEntity, value: string | number | boolean, pagination?: PaginationModel | undefined): TransferEntity[] {
        throw new Error("Method not implemented.");
    }
    findIndexById(id: string): number {
        throw new Error("Method not implemented.");
    }

}