import { Injectable } from "@nestjs/common";
import { DepositEntity } from '../entities';
import { Repository } from "./base/repository.base";
import { IRepository } from "./interfaces/repository.interface";

@Injectable()
export class DepositRepository extends Repository<DepositEntity>  implements IRepository<DepositEntity>{
    register(entity: DepositEntity): DepositEntity {
        throw new Error("Method not implemented.");
    }

    update(id: string, entity: DepositEntity): DepositEntity {
        throw new Error("Method not implemented.");
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