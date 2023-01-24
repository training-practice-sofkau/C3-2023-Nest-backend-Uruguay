import { Injectable } from "@nestjs/common";
import { Repository } from "./base";
import { DepositEntity } from '../entities';

@Injectable()
export class DepositRepository extends Repository<DepositEntity> {
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