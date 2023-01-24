import { Injectable } from "@nestjs/common/decorators";
import { TransferEntity } from '../entities/transfer.entity';
import { RepositoryMethodsInterface } from "./interfaces";

@Injectable()
export class TransferRepository implements RepositoryMethodsInterface<TransferEntity> {
     private readonly database: Array<TransferEntity>;

    constructor(){        
        this.database = new Array<TransferEntity>();
    } 
    register(entity: TransferEntity): TransferEntity {
        throw new Error("Method not implemented.");
    }
    update(id: string, entity: TransferEntity): TransferEntity {
        throw new Error("Method not implemented.");
    }
    delete(id: string, soft?: boolean | undefined): void {
        throw new Error("Method not implemented.");
    }
    findAll(): TransferEntity[] {
        throw new Error("Method not implemented.");
    }
    findOneById(id: string): TransferEntity {
        throw new Error("Method not implemented.");
    }
}