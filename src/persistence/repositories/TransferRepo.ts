import { Injectable, NotFoundException } from "@nestjs/common";
import { TransferEntity } from "../entities/transfer-entity";
import { TransferRepositoryInterface } from "./interface/i-transfer-repo";
import { BaseRepository } from "./repo-base/base-repository";

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

        return this.database.filter((objAll) => typeof objAll.deletedAt === 'undefined');
    }



    findOneById(id: string): TransferEntity {

        const currentEntity = this.database.find((objId) => objId.id === id && typeof objId.deletedAt === 'undefined');

        if(!currentEntity ) throw new NotFoundException('Lo siento, nada por aquí! =(');

        return currentEntity;
    }




    findOutcomeByDataRange(accountId: string, dateInit: Date | number, dateEnd: Date | number): TransferEntity[] {
        
        const currentEntity = this.database.filter((objORange) => objORange.outcome.id === accountId && objORange.dateTime >= dateInit && objORange.dateTime <= dateEnd && typeof objORange.deletedAt === 'undefined');
        
        if(!currentEntity ) throw new NotFoundException('Lo siento, nada por aquí! =(');

        return currentEntity;
    }




    findIncomeByDataRange(accountId: string, dateInit: Date | number, dateEnd: Date | number): TransferEntity[] {
        
        const currentEntity = this.database.filter((objIRange) => objIRange.income.id === accountId && objIRange.dateTime >= dateInit && objIRange.dateTime <= dateEnd && typeof objIRange.deletedAt === 'undefined');
        
        if(!currentEntity ) throw new NotFoundException('Lo siento, nada por aquí! =(');
        
        return currentEntity;
    }
}