import { Injectable } from "@nestjs/common";
import { DepositEntity } from '../entities/deposit.entity';
import { BaseRepositories } from "./base";


@Injectable()
export class DepositRepository  extends  BaseRepositories <DepositEntity> {
    findAll(): DepositEntity[] {
        throw new Error("Method not implemented.");
    }
    findOneById(id: string): DepositEntity {
        throw new Error("Method not implemented.");
    }
    register(entity: DepositEntity): DepositEntity {
        throw new Error("Method not implemented.");
    }
    update(id: string, entity: DepositEntity): DepositEntity {
        throw new Error("Method not implemented.");
    }
    delete(id: string): void {
        throw new Error("Method not implemented.");
    }

}