import { Injectable } from "@nestjs/common";
import { DepositEntity } from "../entities";
import { AMetodosAbstract } from './base/a-metodos.base';


@Injectable()
export class DepositRepository extends AMetodosAbstract<DepositEntity>{
    
    register(entity: DepositEntity): DepositEntity{
        throw new Error('This method is not implemented');
    }
    
    update(id: string, entity: DepositEntity): DepositEntity {
        throw new Error('This method is not implemented');
    }
    
    delete(id: string, soft?: boolean): void {
        throw new Error('This method is not implemented');
    }
    
    findAll(): DepositEntity[] {
        throw new Error('This method is not implemented');
    }
    
    findOneById(id: string): DepositEntity {
        throw new Error('This method is not implemented');
    }
}