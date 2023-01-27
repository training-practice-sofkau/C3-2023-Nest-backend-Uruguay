import { NotFoundException } from "@nestjs/common";
import { DepositEntity } from "../entities/deposit-entity";
import { IRepository } from "./interface/i-base/i-repository";
import { BaseRepository } from "./repo-base/base-repository";

export class DepositRepository extends BaseRepository<DepositEntity> implements IRepository<DepositEntity> {
    
    
    
    
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




    delete(id: string, soft?: boolean | undefined): void {
        throw new Error("Method not implemented.");
    }
    findAll(): DepositEntity[] {
        throw new Error("Method not implemented.");
    }
    findOneById(id: string): DepositEntity {
        throw new Error("Method not implemented.");
    }



    
}